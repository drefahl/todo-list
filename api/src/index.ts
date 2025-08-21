import { createServer } from './app';
import { env } from './config/env.config';

const start = async () => {
  try {
    const app = await createServer();

    await app.listen({ port: env.PORT, host: env.HOSTNAME });
  } catch (err) {
    console.error(err);
  }
};

start();
