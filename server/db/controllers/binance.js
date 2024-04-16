'use strict';
const Binance = require('../models').BinanceKey;
const sequelize = require('sequelize');
const { Spot } = require('@binance/connector');
const {
  getUserInformation,
  getUserOrders,
  createOrder,
  cancelOrder,
  checkTradePermissions,
} = require('./binanceUtils');
const NodeRSA = require('node-rsa');

module.exports = {
  getUserData(req, res) {
    return Binance.findOne({
      where: {
        userId: req.user.sub,
      },
    }).then(async (binanceKeys) => {
      if (!binanceKeys) {
        return res.status(200).send({});
      }
      let privateKey = Buffer.from(
        process.env.RSA_KEY_PRIVATE,
        'base64'
      ).toString('ascii');
      const key = new NodeRSA(privateKey, 'private');
      const apiKey = key.decrypt(binanceKeys.apiKey, 'utf8');
      const apiSecret = key.decrypt(binanceKeys.apiSecret, 'utf8');
      let result = await getUserInformation(
        apiKey,
        apiSecret,
        binanceKeys.isTestnet
      );
      if (result.totalValue) {
        return res.status(200).send(result);
      }
      return res.status(400).send({
        message: result,
      });
    });
  },

  getUserOrders(req, res) {
    if (!req.params.symbol) {
      return res.status(400).send({
        message: 'No symbol specified',
      });
    }
    return Binance.findOne({
      where: {
        userId: req.user.sub,
      },
    }).then(async (binanceKeys) => {
      if (!binanceKeys) {
        return res.status(200).send({});
      }
      let privateKey = Buffer.from(
        process.env.RSA_KEY_PRIVATE,
        'base64'
      ).toString('ascii');
      const key = new NodeRSA(privateKey, 'private');
      const apiKey = key.decrypt(binanceKeys.apiKey, 'utf8');
      const apiSecret = key.decrypt(binanceKeys.apiSecret, 'utf8');
      let result = await getUserOrders(
        apiKey,
        apiSecret,
        binanceKeys.isTestnet,
        req.params.symbol
      );
      if (result.err) {
        return res.status(400).send({
          message: result.err,
        });
      }
      return res.status(200).send(result);
    });
  },

  checkTradingPermissions(req, res) {
    return Binance.findOne({
      where: {
        userId: req.user.sub,
      },
    }).then(async (binanceKeys) => {
      if (!binanceKeys) {
        return res.status(400).send({
          message: 'Keys not found',
        });
      }
      if (binanceKeys.isTestnet) {
        return res.status(200).message('Trading allowed');
      }
      let privateKey = Buffer.from(
        process.env.RSA_KEY_PRIVATE,
        'base64'
      ).toString('ascii');
      const key = new NodeRSA(privateKey, 'private');
      const apiKey = key.decrypt(binanceKeys.apiKey, 'utf8');
      const apiSecret = key.decrypt(binanceKeys.apiSecret, 'utf8');
      let result = await checkTradePermissions(apiKey, apiSecret);
      if (result.err) {
        return res.status(400).send({
          message: result.err,
        });
      }
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(400).send({
          message: result,
        });
      }
    });
  },

  add(req, res) {
    if (!req.body.apiKey || !req.body.apiSecret) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to add binance api keys',
      });
    }
    let privateKey = Buffer.from(
      process.env.RSA_KEY_PRIVATE,
      'base64'
    ).toString('ascii');

    const key = new NodeRSA(privateKey, 'private');
    const apiKey = key.decrypt(req.body.apiKey, 'utf8');
    const apiSecret = key.decrypt(req.body.apiSecret, 'utf8');
    const options = {};

    if (req.body.isTestnet) {
      options.baseURL = 'https://testnet.binance.vision';
    }

    const client = new Spot(apiKey, apiSecret, options);

    client
      .account()
      .then((response) => {
        // console.log(response?.data);
        return Binance.create({
          userId: req.user.sub,
          apiKey: req.body.apiKey,
          apiSecret: req.body.apiSecret,
          isTestnet: req.body.isTestnet || false,
        })
          .then(() =>
            res
              .status(201)
              .send({ message: 'Api keys were successfully saved' })
          )
          .catch((error) => res.status(400).send({ error: error.message }));
      })
      .catch((error) => {
        res
          .status(400)
          .send({ error: 'Api keys are not valid', details: error });
      });
  },

  createOrder(req, res) {
    if (
      !req.body.type ||
      (req.body.type != 'MARKET' && req.body.type != 'LIMIT')
    ) {
      return res.status(400).send({
        status: false,
        message: 'Wrong order type (or not specified)',
      });
    }
    if (
      (req.body.type == 'MARKET' &&
        (!req.body.usdtQuantity || !req.body.symbol || !req.body.side)) ||
      (req.body.type == 'LIMIT' &&
        (!req.body.symbol ||
          !req.body.side ||
          !req.body.price ||
          !req.body.quantity))
    ) {
      return res.status(400).send({
        status: false,
        message: 'Not enough data to create order',
      });
    }

    return Binance.findOne({
      where: {
        userId: req.user.sub,
      },
    }).then(async (binanceKeys) => {
      if (!binanceKeys) {
        return res.status(400).send({
          message: 'Keys not found',
        });
      }
      let privateKey = Buffer.from(
        process.env.RSA_KEY_PRIVATE,
        'base64'
      ).toString('ascii');
      const key = new NodeRSA(privateKey, 'private');
      const apiKey = key.decrypt(binanceKeys.apiKey, 'utf8');
      const apiSecret = key.decrypt(binanceKeys.apiSecret, 'utf8');
      let options = {};
      if (req.body.type == 'LIMIT') {
        options = {
          price: req.body.price,
          quantity: parseFloat(req.body.quantity),
          timeInForce: 'GTC',
        };
      } else if (req.body.type == 'MARKET') {
        options = {
          quoteOrderQty: req.body.usdtQuantity,
        };
      } else {
        return res.status(400).send({
          message: 'Wrong order type',
        });
      }
      let order = await createOrder(
        apiKey,
        apiSecret,
        binanceKeys.isTestnet,
        req.body.symbol,
        req.body.type,
        req.body.side,
        options
      );
      if (order.err) {
        return res.status(400).send({
          message: order.err,
        });
      }
      return res.status(200).send(order);
    });
  },

  cancelOrder(req, res) {
    if (!req.body.orderId || !req.body.symbol) {
      return res.status(400).send({
        status: false,
        message: 'Not enough data to cancel order',
      });
    }
    return Binance.findOne({
      where: {
        userId: req.user.sub,
      },
    }).then(async (binanceKeys) => {
      if (!binanceKeys) {
        return res.status(400).send({
          message: 'Keys not found',
        });
      }
      let privateKey = Buffer.from(
        process.env.RSA_KEY_PRIVATE,
        'base64'
      ).toString('ascii');
      const key = new NodeRSA(privateKey, 'private');
      const apiKey = key.decrypt(binanceKeys.apiKey, 'utf8');
      const apiSecret = key.decrypt(binanceKeys.apiSecret, 'utf8');
      let canceled = await cancelOrder(
        apiKey,
        apiSecret,
        binanceKeys.isTestnet,
        req.body.symbol,
        req.body.orderId
      );
      if (canceled.err) {
        console.log(canceled);
        return res.status(400).send({
          message: canceled.err,
        });
      }
      return res.status(200).send(canceled);
    });
  },

  update(req, res) {},

  delete(req, res) {
    return Binance.findOne({
      where: {
        userId: req.user.sub,
      },
    }).then((binanceKeys) => {
      if (!binanceKeys) {
        return res.status(400).send({
          message:
            'Binance keys not found to delete transaction of user does not have access to that portfilio',
        });
      }
      return binanceKeys
        .destroy()
        .then(() =>
          res
            .status(200)
            .send({ message: 'Binance api keys were successfully deleted!' })
        )
        .catch((error) => res.status(400).send(error));
    });
  },
};
