import type { FastifyInstance } from 'fastify';
import z from 'zod';

export async function healthCheckRoute(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        tags: ['Health'],
        operationId: 'health',
        response: {
          200: z.object({
            time: z.string(),
            uptime: z.number(),
          }),
        },
      },
    },
    (_, reply) => {
      reply.send({
        time: new Date().toISOString(),
        uptime: process.uptime(),
      });
    },
  );
}
