'use strict';
const { parseFoundationAddresses } = require('./donationUtils');

module.exports = {
  async getFoundationsWallets(req, res) {
    let results = await parseFoundationAddresses();
    if (results.data) {
      return res.status(200).send(results);
    }
    res.status(400).send({ error: 'Could not get foundation wallets data' });
  },
};
