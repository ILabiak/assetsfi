'use strict';
const Currency = require('../models').Currency;
const sequelize = require('sequelize');
require('dotenv').config();

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

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

  async getCurrencyRate(req, res) {
    if (!req.params.currency) {
      return res.status(400).send({
        message: "You haven't passed currency",
      });
    }
    let requestUrl = `https://api.currencybeacon.com/v1/latest?base=usd&symbols=${req.params.currency}&api_key=${process.env.BEACON_API}`;
    const response = await fetch(requestUrl);
    let responseJSON = await response.json();
    if (responseJSON?.rates) {
      return res
        .status(200)
        .send({ rate: responseJSON.rates[req.params.currency.toUpperCase()] || 0 });
    }
    return res.status(400).send({
      message: 'Could not parse exchange rate',
    });
  },
};
