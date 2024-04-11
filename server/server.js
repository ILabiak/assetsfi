const fastify = require('fastify')({ logger: true });
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

fastify.addHook('onRequest', async (req, res) => {
  try {
    console.log(req.routeOptions.url);
    if (
      req.routeOptions.url === '/currencies' ||
      req.routeOptions.url === '/coins' ||
      req.routeOptions.url === '/currency/:currency' ||
      req.routeOptions.url === '/test'
    ) {
      return;
    }
    await req.jwtVerify();
  } catch (err) {
    res.send(err);
  }
});

fastify.get('/', async (req, res) => {
  // console.log(req.user)
  res.send({ hello: 'world' });
});

fastify.get('/test', async (req, res) => {
  try {
    res.status(200).send({ message: 'API call successful' });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send({ message: 'Unauthorized' });
  }
});

// Run the server!
fastify.listen({ host: process.env.HOST, port: process.env.PORT }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
