import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { hasZodFastifySchemaValidationErrors, isResponseSerializationError } from 'fastify-type-provider-zod';
import z, { ZodError } from 'zod';
import { NotFoundError } from '@/errors/NotFoundError';

export function errorHandler(err: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  request.log.error(err);

  if (err instanceof NotFoundError) {
    return reply.status(404).send({
      error: 'Not Found',
      message: err.message,
      statusCode: 404,
    });
  }

  if (err instanceof ZodError) {
    return reply.status(400).send({
      error: 'Validation Error',
      message: 'Invalid request data',
      statusCode: 400,
      details: {
        issues: z.treeifyError(err),
        method: request.method,
        path: request.url,
      },
    });
  }

  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.code(400).send({
      error: 'Validation Error',
      message: 'Invalid request data',
      statusCode: 400,
      details: {
        issues: err.validation,
        method: request.method,
        path: request.url,
      },
    });
  }

  if (isResponseSerializationError(err)) {
    return reply.code(500).send({
      error: 'Serialization Error',
      message: 'Invalid response format',
      statusCode: 500,
      details: {
        issues: err.cause.issues,
        method: request.method,
        path: request.url,
      },
    });
  }

  return reply.status(500).send({
    error: 'Internal Server Error',
    message: 'Something went wrong',
    statusCode: 500,
  });
}
