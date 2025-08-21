import fastifyCors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';

export function corsConfig(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: '*', // TODO: Update to specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}
