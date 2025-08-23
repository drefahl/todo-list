import { writeFileSync } from 'node:fs';
import { createServer } from '../src/app';

async function generateOpenApi() {
  const app = await createServer();

  const swagger = app.swagger();

  writeFileSync('openapi.json', JSON.stringify(swagger, null, 2));

  console.log('OpenAPI documentation has been generated!');
  process.exit(0);
}

generateOpenApi().catch((err) => {
  console.error('Error generating OpenAPI documentation:', err);
  process.exit(1);
});
