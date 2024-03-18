'use strict';
const Portfolio = require('../models').Portfolio;
const Currency = require('../models').Currency;
const Transaction = require('../models').Transaction;
const Coin = require('../models').Coin;
const sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { calculatePortfolioStats, calculatePortfolioCoins } = require('./utils');

module.exports = {
  getByUUID(req, res) {
    return Portfolio.findOne({
      where: {
        userId: req.user.sub,
        uuid: req.params.uuid,
      },
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
      order: [[{ model: Transaction }, 'date', 'DESC']],
    }).then(async (portfolio) => {
      let portfolioData = portfolio.get({ plain: true });
      portfolioData = await calculatePortfolioCoins(portfolioData)
      if (!portfolio) {
        return res.status(400).send({
          message: 'Portfolio Not Found',
        });
      }
      res.status(200).send(portfolioData);
    });
  },

  getUserPortfolios(req, res) {
    return Portfolio.findAll({
      where: {
        userId: req.user.sub,
      },
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
      order: [
        ['id', 'ASC'],
        [{ model: Transaction }, 'date', 'DESC'],
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
        if(!rawData[0]?.uuid){
          res.status(400).send({
            status: false,
            message: 'Some error while getting portfolios data',
          });
        }
        res.status(200).send(rawData);
      } catch (err) {
        console.log(err);
      }
    });
  },

  add(req, res) {
    if (!req.body.name || !req.body.currencyId) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to create portfolio',
      });
    }
    if (!req.user.sub) {
      res.status(400).send({
        status: false,
        message: 'User not authorised',
      });
    }
    return Portfolio.create({
      // uuid: uuidv4(),
      userId: req.user.sub,
      title: req.body.name,
      currencyId: req.body.currencyId,
    })
      .then((portfolio) => res.status(201).send(portfolio))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Portfolio.findOne({
      where: {
        userId: req.user.sub,
        uuid: req.body.uuid,
      },
    })
      .then((portfolio) => {
        if (!portfolio) {
          return res.status(404).send({
            message: 'Portfolio Not Found',
          });
        }
        return portfolio
          .update({
            title: req.body.name || portfolio.title,
          })
          .then(() => res.status(200).send(portfolio))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Portfolio.findOne({
      where: {
        userId: req.user.sub,
        uuid: req.body.uuid,
      },
    })
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
