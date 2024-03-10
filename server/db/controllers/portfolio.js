'use strict';
const Portfolio = require('../models').Portfolio;
const sequelize = require('sequelize');

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
        userId: req.cookies.user_id,
      },
    }).then(async (portfolios) => {
      if (!portfolios) {
        return res.status(400).send({
          message: 'Portfolios Not Found',
        });
      }
      res.status(200).send(portfolios);
    });
  },

  getBySectionId(req, res) {
    return Portfolio.findAll({
      where: {
        section_id: req.params.section_id,
      },
    })
      .then(async (portfolios) => {
        const portfoliosRes = [];
        for (const portfolio of portfolios) {
          const handledPortfolio = await handlePortfolio(portfolio, res);
          portfoliosRes.push(handledPortfolio);
        }
        res.status(200).send(portfoliosRes);
      })
      .catch((error) => {
        res.status(400).send(error);
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
