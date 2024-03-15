'use strict';
const Currency = require('../models').Currency;
const sequelize = require('sequelize');

module.exports = {
  getCurrencies(req, res) {
    return Currency.findAll().then(async (currencies) => {
      if (!currencies) {
        return res.status(400).send({
          message: 'Currencies Not Found',
        });
      }
      res.status(200).send(currencies);
    });
  },

  add(req, res) {
    return Currency.create({
      //
    })
      .then((section) => res.status(201).send(section))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Currency.findByPk(req.params.id)
      .then((currency) => {
        if (!currency) {
          return res.status(400).send({
            message: 'Currency Not Found',
          });
        }
        return currency
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ message: 'Currency was successfully deleted!' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
