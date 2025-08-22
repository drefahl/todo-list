import { FastifyInstance } from 'fastify';
import { TaskController } from './task.controller';
import { createTaskSchema, updateTaskSchema } from './task.dtos';
import { positiveIntegerIdSchema as positiveIntegerIdSchema } from '@/schemas/id.schema';

const controller = new TaskController();

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['tasks'],
        operationId: 'getTasks',
      },
    },
    controller.getAll.bind(controller),
  );

  fastify.post(
    '/',
    {
      schema: {
        tags: ['tasks'],
        operationId: 'createTask',
        body: createTaskSchema,
      },
    },
    controller.create.bind(controller),
  );

  fastify.put(
    '/:id',
    {
      schema: {
        tags: ['tasks'],
        operationId: 'updateTask',
        params: positiveIntegerIdSchema,
        body: updateTaskSchema,
      },
    },
    controller.update.bind(controller),
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        tags: ['tasks'],
        operationId: 'deleteTask',
        params: positiveIntegerIdSchema,
      },
    },
    controller.delete.bind(controller),
  );
}
