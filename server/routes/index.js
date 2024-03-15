const controllers = require('../db/controllers');

const { portfolio: portfolioController, currency: currencyController } =
  controllers;

async function routes(fastify /*, options*/) {
  /* Portfolio Routes */
  fastify.get('/portfolio/:uuid', portfolioController.getByUUID);
  fastify.get('/portfoliosdata', portfolioController.getUserPortfolios);
  fastify.post('/portfolio/create', portfolioController.add);
  fastify.delete('/portfolio/delete', portfolioController.delete);
  fastify.put('/portfolio/update', portfolioController.update);

  /* Currency Routes */
  fastify.get('/currencies', currencyController.getCurrencies);
}

module.exports = routes;
