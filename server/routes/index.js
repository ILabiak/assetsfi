const controllers = require('../db/controllers');

const {
  portfolio: portfolioController,
  currency: currencyController,
  coin: coinController,
  transaction: transactionController,
  binance: binanceController,
  user: userController,
} = controllers;

async function routes(fastify /*, options*/) {
  /* Portfolio Routes */
  fastify.get('/portfolio/:uuid', portfolioController.getByUUID);
  fastify.get('/portfoliosdata', portfolioController.getUserPortfolios);
  fastify.post('/portfolio/create', portfolioController.add);
  fastify.delete('/portfolio/delete', portfolioController.delete);
  fastify.put('/portfolio/update', portfolioController.update);

  /* Currency Routes */
  fastify.get('/currencies', currencyController.getCurrencies);
  fastify.get('/currency/:currency', currencyController.getCurrencyRate);

  /* Coin Routes */
  fastify.get('/coins', coinController.getCoins);

  /* Transaction Routes */
  fastify.post('/transaction/create', transactionController.add);
  fastify.put('/transaction/update', transactionController.update);
  fastify.delete('/transaction/delete', transactionController.delete);

  /* Binance Routes */
  fastify.get('/binance/userdata', binanceController.getUserData);
  fastify.post('/binance/create', binanceController.add);
  fastify.delete('/binance/delete', binanceController.delete);

  /* User Routes */
  fastify.get('/user/metadata', userController.getUserUserMetadata);
  fastify.put('/user/update', userController.update);
  fastify.put('/user/changepassword', userController.changePassword);
}

module.exports = routes;
