'use strict';
const UserMetadata = require('../models').UserMetadata;
const sequelize = require('sequelize');

module.exports = {
  async getUserUserMetadata(req, res) {
    return UserMetadata.findOne({
      where: {
        userId: req.user.sub,
      },
    })
      .then((metadata) => {
        if (!metadata) {
          if (!req.cookies.name) {
            res
              .status(400)
              .send({ message: 'Did not get metadata in cookies' });
          }
          return UserMetadata.create({
            userId: req.user.sub,
            name: req.cookies.name,
            nickname: req.cookies.nickname,
            picture: req.cookies.picture,
          })
            .then((addedMetadata) => res.status(200).send(addedMetadata))
            .catch((error) => res.status(400).send(error));
        }
        return res.status(200).send(metadata);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    if (!req.body.name || !req.body.currencyId) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to create portfolio',
      });
    }
    return UserMetadata.create({
      // uuid: uuidv4(),
      userId: req.user.sub,
      title: req.body.name,
      currencyId: req.body.currencyId,
    })
      .then((portfolio) => res.status(201).send(portfolio))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return UserMetadata.findOne({
      where: {
        userId: req.user.sub,
        uuid: req.body.uuid,
      },
    })
      .then((portfolio) => {
        if (!portfolio) {
          return res.status(404).send({
            message: 'UserMetadata Not Found',
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

  delete(req, res) {},
};
