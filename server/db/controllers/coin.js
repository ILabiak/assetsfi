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

  add(req, res) {
    return Coin.create({
      //
    })
      .then((coin) => res.status(201).send(coin))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Coin.findByPk(req.params.id)
      .then((coin) => {
        if (!coin) {
          return res.status(400).send({
            message: 'Coin Not Found',
          });
        }
        return coin
          .destroy()
          .then(() =>
            res.status(200).send({ message: 'Coin was successfully deleted!' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
