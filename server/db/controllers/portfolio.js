'use strict';
const Portfolio = require('../models').Portfolio;
const Currency = require('../models').Currency;
const Transaction = require('../models').Transaction;
const Coin = require('../models').Coin;
const sequelize = require('sequelize');
const { calculatePortfolioStats } = require('./utils');

module.exports = {
  getByUUID(req, res) {
    return Portfolio.findOne({
      where: {
        uuid: req.params.uuid,
      },
    }).then(async (portfolio) => {
      if (!portfolio) {
        return res.status(400).send({
          message: 'Portfolio Not Found',
        });
      }
      res.status(200).send(portfolio);
    });
  },

  getUserPortfolios(req, res) {
    return Portfolio.findAll({
      where: {
        userId: req.user.sub,
      },
      // raw: true,
      // nest: true,
      include: [
        {
          model: Transaction,
          include: [
            {
              model: Coin,
            },
          ],
        },
        {
          model: Currency,
        },
      ],
    }).then(async (portfolios) => {
      if (!portfolios) {
        return res.status(400).send({
          message: 'Portfolios Not Found',
        });
      }
      const results = [];
      const rawData = portfolios.map((node) => node.get({ plain: true }));
      try {
        for await (let portfolio of rawData) {
          portfolio = await calculatePortfolioStats(portfolio);
        }
        res.status(200).send(rawData);
      } catch (err) {
        console.log(err);
      }
    });
  },



  add(req, res) {
    return Portfolio.create({
      //
    })
      .then((section) => res.status(201).send(section))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Portfolio.findByPk(req.params.id)
      .then((portfolio) => {
        if (!portfolio) {
          return res.status(400).send({
            message: 'Portfolio Not Found',
          });
        }
        return portfolio
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ message: 'Portfolio was successfully deleted!' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
