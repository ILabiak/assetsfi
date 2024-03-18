'use strict';
const Transaction = require('../models').Transaction;
const Portfolio = require('../models').Portfolio;
const sequelize = require('sequelize');

module.exports = {
  add(req, res) {
    if (!req.body.coinId || !req.body.portfolioId) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to create transaction',
      });
    }
    if (!req.user.sub) {
      res.status(400).send({
        status: false,
        message: 'User not authorised',
      });
    }
    return Portfolio.findOne({
      where: {
        userId: req.user.sub,
        uuid: req.body.portfolioId,
      },
    }).then(async (portfolio) => {
      if (!portfolio) {
        return res.status(400).send({
          message:
            'Portfolio Not Found to create transaction of user does not have access to that portfilio',
        });
      }
      return Transaction.create({
        portfolioId: portfolio.id,
        coinId: req.body.coinId,
        date: req.body.date,
        amount: req.body.amount,
        fees: req.body.fees || 0,
        description: req.body.description,
        originCurrency: req.body.originCurrency,
        costPerUnitInUsd: req.body.costPerUnitInUsd,
        costPerUnitInCurrency: req.body.costPerUnitInCurrency,
      })
        .then((transaction) => res.status(201).send(transaction))
        .catch((error) => res.status(400).send(error));
    });
  },

  update(req, res) {
    return Transaction.findOne({
      where: {
        userId: req.user.sub,
        uuid: req.body.uuid,
      },
    })
      .then((transaction) => {
        if (!transaction) {
          return res.status(404).send({
            message: 'Transaction Not Found',
          });
        }
        return transaction
          .update({
            title: req.body.name || transaction.title,
          })
          .then(() => res.status(200).send(transaction))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Transaction.findOne({
      where: {
        userId: req.user.sub,
        uuid: req.body.uuid,
      },
    })
      .then((transaction) => {
        if (!transaction) {
          return res.status(400).send({
            message: 'Transaction Not Found',
          });
        }
        return transaction
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ message: 'Transaction was successfully deleted!' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
