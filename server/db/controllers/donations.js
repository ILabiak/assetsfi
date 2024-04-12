'use strict';
const {
  parseFoundationAddresses,
  calculateDonationsStats,
  checkWalletAddress,
  getAddressData,
  getTokensMetadata,
} = require('./donationUtils');
const { getCurrencyRate } = require('./utils');
const Donation = require('../models').Donation;
const Foundation = require('../models').Foundation;
const Currency = require('../models').Currency;
const SupportedNetwork = require('../models').SupportedNetwork;
const TrackedAddress = require('../models').TrackedAddress;

module.exports = {
  async getFoundationsWallets(req, res) {
    let results = await parseFoundationAddresses();
    if (results.data) {
      return res.status(200).send(results);
    }
    res.status(400).send({ error: 'Could not get foundation wallets data' });
  },

  getUserDonations(req, res) {
    return Donation.findAll({
      where: { userId: req.user.sub },
      include: [{ model: Foundation }, { model: Currency }],
      order: [['date', 'DESC']],
    }).then(async (donations) => {
      if (!donations) {
        return res.status(400).send({
          message: 'Donations Not Found',
        });
      }
      let donationsData = [];
      donations.map((el) => {
        donationsData.push(el.get({ plain: true }));
      });
      const result = calculateDonationsStats(donationsData);
      res.status(200).send(result);
    });
  },

  getFoundations(req, res) {
    return Foundation.findAll().then(async (foundations) => {
      if (!foundations) {
        return res.status(400).send({
          message: 'Foundations Not Found',
        });
      }
      res.status(200).send(foundations);
    });
  },

  getSupportedNetworks(req, res) {
    return SupportedNetwork.findAll().then(async (networks) => {
      if (!networks) {
        return res.status(400).send({
          message: 'Networks Not Found',
        });
      }
      res.status(200).send(networks);
    });
  },

  async add(req, res) {
    if (!req.body.currency || !req.body.amount) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to add donation',
      });
    }
    let currencyRate = 1;
    if (req.body.currency.code != 'usd') {
      currencyRate = await getCurrencyRate(req.body.currency.code, 'usd');
      // console.log(currencyRate)
    }
    if (currencyRate < 0) {
      res.status(400).send({
        status: false,
        message: 'Error while fetching currency rate',
      });
    }
    return Donation.create({
      userId: req.user.sub,
      foundationId: req.body.foundationId,
      amount: req.body.amount,
      date: req.body.date,
      description: req.body.description,
      currencyId: req.body.currency.id,
      amountInUsd: parseFloat((req.body.amount / currencyRate).toFixed(5)),
    })
      .then((donation) => res.status(201).send(donation))
      .catch((error) => res.status(400).send(error));
  },

  async addTrackingAddress(req, res) {
    if (!req.body.currencyId || !req.body.address || !req.body.network?.code) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to add tracking address',
      });
    }
    const checkAddress = await checkWalletAddress(
      req.body.network.code,
      req.body.address
    );
    if (!checkAddress) {
      res.status(400).send({
        status: false,
        message: 'Address is not valid',
      });
    }
    return TrackedAddress.create({
      userId: req.user.sub,
      name: req.body?.name || null,
      networkId: req.body.network.id,
      address: req.body.address,
      targetAmount: req.body.target
        ? parseFloat(req.body.target.toFixed(5))
        : null,
      currencyId: req.body.currencyId,
    })
      .then((address) => res.status(201).send(address))
      .catch((error) => res.status(400).send(error));
  },

  async getTrackingAddresses(req, res) {
    try {
      const addresses = await TrackedAddress.findAll({
        where: { userId: req.user.sub },
        include: [{ model: SupportedNetwork }, { model: Currency }],
        order: [['updatedAt', 'DESC']],
      });

      if (!addresses || addresses.length === 0) {
        return res.status(200).send({ addresses: [] });
      }

      const addressesData = await Promise.all(
        addresses.map(async (address) => {
          let data = address.get({ plain: true });
          const addressStats = await getAddressData(data);
          return addressStats;
        })
      );

      const metadata = await getTokensMetadata(addressesData);

      return res
        .status(200)
        .send({ addresses: addressesData, metadata: metadata });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  async updateTrackingAddress(req, res) {
    if (!req.body.id) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to edit tracking address',
      });
    }
    return TrackedAddress.findOne({
      where: {
        userId: req.user.sub,
        id: req.body.id,
      },
      include: [{ model: SupportedNetwork }, { model: Currency }],
    }).then(async (address) => {
      if (!address) {
        return res.status(404).send({
          message: 'Address Not Found',
        });
      }
      let updateObj = {
        name: address.name,
        networkId: req.body.network?.id || address.networkId,
        targetAmount: req.body.target
          ? parseFloat(req.body.target.toFixed(5))
          : address.targetAmount,
        currencyId: req.body.currency?.id || address.currencyId,
      };

      if (req.body.name != undefined && typeof req.body.name == 'string') {
        updateObj.name = req.body.name;
      }

      if (req.body.address || req.body.network) {
        let addressToCheck = req.body.address || address.address;
        let network = req.body.network || address[SupportedNetwork];

        let checkAddress = await checkWalletAddress(
          network.code,
          addressToCheck
        );
        if (!checkAddress) {
          return res.status(400).send({
            status: false,
            message: 'Either selected network or address is not valid',
          });
        }
        updateObj.address = addressToCheck;
        updateObj.networkId = network.id;
      }

      return address
        .update(updateObj)
        .then(() => res.status(200).send(address))
        .catch((error) => res.status(400).send(error));
    });
  },

  update(req, res) {
    if (!req.body.id) {
      res.status(400).send({
        status: false,
        message: 'Not enough data to edit donation',
      });
    }
    return Donation.findOne({
      where: {
        userId: req.user.sub,
        id: req.body.id,
      },
      include: [{ model: Currency }],
    })
      .then(async (donation) => {
        if (!donation) {
          return res.status(404).send({
            message: 'Donation Not Found',
          });
        }
        let currencyRate, amountInUsd;
        if (req.body?.currency || req.body.amount) {
          let currency = req.body?.currency || donation['Currency'];
          if (currency != 'usd') {
            currencyRate = await getCurrencyRate(currency.code, 'usd');
          } else {
            currencyRate = 1;
          }
          let amount = req.body.amount || donation.amount;
          amountInUsd = parseFloat((amount / currencyRate).toFixed(5));

          if (currencyRate < 0) {
            res.status(400).send({
              status: false,
              message: 'Error while fetching currency rate',
            });
          }
        }
        let foundationId =
          req.body.foundationId != undefined || req.body.foundationId == null
            ? req.body.foundationId
            : donation.foundationId;
        return donation
          .update({
            foundationId: foundationId,
            amount: req.body.amount || donation.amount,
            date: req.body.date || donation.date,
            description: req.body.description || donation.description,
            currencyId: req.body?.currency?.id || donation.currencyId,
            amountInUsd: amountInUsd || donation.currencyId,
          })
          .then(() => res.status(200).send(donation))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Donation.findOne({
      where: {
        userId: req.user.sub,
        id: req.body.id,
      },
    })
      .then((donation) => {
        if (!donation) {
          return res.status(400).send({
            message: 'Donation Not Found',
          });
        }
        return donation
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ message: 'Donation was successfully deleted!' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  deleteTrackingAddress(req, res) {
    return TrackedAddress.findOne({
      where: {
        userId: req.user.sub,
        id: req.body.id,
      },
    })
      .then((address) => {
        if (!address) {
          return res.status(400).send({
            message: 'Address Not Found',
          });
        }
        return address
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ message: 'Tracking address was successfully deleted!' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
