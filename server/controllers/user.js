'use strict';
const UserMetadata = require('../models').UserMetadata;
const sequelize = require('sequelize');
const { jwtDecode } = require('jwt-decode');
const NodeRSA = require('node-rsa');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  async getUserUserMetadata(req, res) {
    // console.log(req.user.sub)
    return UserMetadata.findOne({
      where: {
        userId: req.user.sub,
      },
    })
      .then(async (metadata) => {
        if (!metadata) {
          // console.log(req.headers.authorization);
          const response = await fetch(
            `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: req.headers.authorization,
              },
            }
          );
          const userData = await response.json();
          // console.log(userData);
          if (!userData.name) {
            res.status(400).send({ error: 'Could not get user data' });
          }
          return UserMetadata.create({
            userId: req.user.sub,
            name: userData.name,
            nickname: userData.nickname,
            picture: userData.picture,
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

  async changePassword(req, res) {
    if (!req.body.email || !req.body.newPassword || !req.body.oldPassword) {
      return res.status(400).send({
        error: 'Not enough data to change password',
      });
    }
    let privateKey = Buffer.from(
      process.env.RSA_KEY_PRIVATE,
      'base64'
    ).toString('ascii');

    const key = new NodeRSA(privateKey, 'private');
    const oldPassword = key.decrypt(req.body.oldPassword, 'utf8');
    const newPassword = key.decrypt(req.body.newPassword, 'utf8');
    let options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'password',
        username: req.body.email,
        password: oldPassword,
        audience: 'https://assetsfi.onrender.com/',
        scope: 'SCOPE',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      }),
      redirect: 'follow',
    };
    try {
      const request = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
        options
      );
      const checkPassword = await request.json();
      if (checkPassword?.error) {
        // return checkPassword?.error_description;
        if(checkPassword?.error_description == 'Wrong email or password.'){
          return res.status(400).send({
            error: 'Invalid old password',
          });
        }
        return res.status(400).send({
          error: checkPassword?.error_description,
        });
      }
      if (checkPassword?.access_token) {
        let decoded = jwtDecode(checkPassword?.access_token);
        if (!decoded.sub) {
          return res.status(400).send({
            error: 'Error, no user id',
          });
        }
        let userId = decoded.sub;
        // console.log(userId);
        options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        };

        let request = await fetch(
          `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
          options
        );
        let passwordChanged = await request.json();

        if (passwordChanged.email) {
          console.log('password was saccessfully changed');
          res
            .status(200)
            .send({ message: 'Password was successfully changed' });
        }
        return res.status(400).send({
          error: 'Something went wrong',
        });
      }
      // console.log(checkPassword);
    } catch (err) {
      return res.status(400).send({
        error: err,
      });
    }
  },

  update(req, res) {
    return UserMetadata.findOne({
      where: {
        userId: req.user.sub,
      },
    })
      .then((userData) => {
        if (!userData) {
          return res.status(404).send({
            message: 'UserMetadata Not Found',
          });
        }
        return userData
          .update({
            name: req.body.name || userData.name,
            nickname: req.body.nickname || userData.nickname,
            picture: req.body.picture || userData.picture,
          })
          .then((userData) => res.status(200).send(userData))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {},
};
