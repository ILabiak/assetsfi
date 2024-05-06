'use strict';
const Coin = require('../models').Coin;
const sequelize = require('sequelize');

module.exports = {
  getCoins(req, res) {
    return Coin.findAll().then(async (coins) => {
      if (!coins) {
        return res.status(400).send({
          message: 'Coins Not Found',
        });
      }
      res.status(200).send(coins);
    });
  },
};
