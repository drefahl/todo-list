import fastifyCors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';
import { env } from './env.config';

export function corsConfig(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: env.CORS_ORIGIN.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}
