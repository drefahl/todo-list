import { healthCheckRoute } from '@/modules/health/health.routes';
import { taskRoutes } from '@/modules/tasks/task.routes';
import type { FastifyInstance } from 'fastify';

export function registerRoutes(app: FastifyInstance) {
  app.register(
    (app) => {
      app.register(healthCheckRoute, { prefix: '/health' });
      app.register(taskRoutes, { prefix: '/tasks' });
    },
    { prefix: '/api/v1' },
  );
}
