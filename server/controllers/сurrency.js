'use strict';
const Currency = require('../models').Currency;
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
        .send({
          rate: responseJSON.rates[req.params.currency.toUpperCase()] || 0,
        });
    }
    return res.status(400).send({
      message: 'Could not parse exchange rate',
    });
  },
};
