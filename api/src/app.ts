import { fastify } from 'fastify';
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { corsConfig } from './config/cors.config';
import { env } from './config/env.config';
import { errorHandler } from './config/errorHandler.config';
import { envToLogger } from './config/logger.config';
import { swaggerConfig } from './config/swagger.config';
import { registerRoutes } from './routes/index.routes';

export async function createServer() {
  const app = fastify({ logger: envToLogger[env.NODE_ENV] ?? true }).withTypeProvider<ZodTypeProvider>();

  // Compilers
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Plugins
  corsConfig(app);
  swaggerConfig(app);

  // Error Handling
  app.setErrorHandler(errorHandler);

  // Routes
  registerRoutes(app);

  await app.ready();

  return app;
}
