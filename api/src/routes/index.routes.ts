import type { FastifyInstance } from 'fastify';
import { healthCheckRoute } from './health.routes';

export function registerRoutes(app: FastifyInstance) {
  app.register(healthCheckRoute, { prefix: '/health' });
}
