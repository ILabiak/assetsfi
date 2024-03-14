const fastify = require('fastify')({ logger: false });
const jwt = require('jsonwebtoken');
const fs = require('fs');

fastify.register(require('./routes'));

fastify.register(require('@fastify/cors'), {
  origin: true,
  credentials: true,
});

fastify.register(require('@fastify/cookie'), {
  secret: 'my-secret',
  parseOptions: {},
});

fastify.register(require('@fastify/jwt'), {
  secret: { public: fs.readFileSync('./public.rem') },
});

fastify.addHook('onRequest', async (request, reply) => {
  try {
    const decoded = await request.jwtVerify();
    // console.log(JSON.stringify(decoded, null,2))
  } catch (err) {
    reply.send(err);
  }
});

// Declare a route
fastify.get('/', async (request, reply) => {
  // console.log(request.user)
  reply.send({ hello: 'world' });
});

fastify.get('/server/test', async (request, reply) => {
  //   console.log(request.cookies);
  // console.log(request.user)

  try {
    reply.send({ message: 'API call successful' });
  } catch (error) {
    console.error('Error verifying token:', error);
    reply.status(401).send({ message: 'Unauthorized' });
  }
});

// Run the server!
fastify.listen({ host: process.env.HOST, port: process.env.PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
