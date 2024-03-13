const fastify = require('fastify')({ logger: false });
const jwt = require('jsonwebtoken');

fastify.register(require('@fastify/cors'), {
  origin: true,
  credentials: true,
});

fastify.register(require('@fastify/cookie'), {
  secret: 'my-secret',
  parseOptions: {},
});

fastify.register(require('./routes'));

// Declare a route
fastify.get('/', function handler(request, reply) {
  reply.send({ hello: 'world' });
});

fastify.get('/server/test', async (request, reply) => {
//   console.log(request.cookies);

  try {
    reply.send({ message: 'API call successful' });
  } catch (error) {
    console.error('Error verifying token:', error);
    reply.status(401).send({ message: 'Unauthorized' });
  }
});

// Run the server!
fastify.listen({ port: process.env.PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
