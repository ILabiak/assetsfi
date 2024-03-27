'use strict';
const Binance = require('../models').BinanceKey;
const sequelize = require('sequelize');
const { Spot } = require('@binance/connector');
const { getUserInformation } = require('./binanceUtils');
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
      let result = await getUserInformation(apiKey, apiSecret);
      if (result.totalValue) {
        return res.status(200).send(result);
      }
      return res.status(400).send({
        message: 'Error while fetching user data',
      });
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

    const client = new Spot(apiKey, apiSecret);

    client
      .account()
      .then((response) => {
        // console.log(response?.data);
        return Binance.create({
          userId: req.user.sub,
          apiKey: req.body.apiKey,
          apiSecret: req.body.apiSecret,
        })
          .then(() =>
            res
              .status(201)
              .send({ message: 'Api keys were successfully saved' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => {
        res
          .status(400)
          .send({ error: 'Api keys are not valid', details: error });
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
