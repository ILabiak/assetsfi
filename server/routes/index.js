const controllers = require('../db/controllers');

const { portfolio: portfolioController } = controllers;

async function routes(fastify /*, options*/) {
  /* Portfolio Routes */
  fastify.get('/server/portfolio/:uuid', portfolioController.getByUUID);
  fastify.get('/server/portfoliosdata', portfolioController.getUserPortfolios)

}

module.exports = routes;
