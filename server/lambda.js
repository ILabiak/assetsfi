const awsLambdaFastify = require('@fastify/aws-lambda')
const fastify = require('./server')

const proxy = awsLambdaFastify(fastify)

exports.handler = proxy