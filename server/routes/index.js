const controllers = require('../db/controllers');

const { portfolio: portfolioController } = controllers;

async function routes(fastify /*, options*/) {
  /* Portfolio Routes */
  fastify.get('/portfolio/:uuid', portfolioController.getByUUID);

}

module.exports = routes;
