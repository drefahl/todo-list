import { defineConfig } from 'orval';

const OPENAPI_PATH = '../api/openapi.json';

export default defineConfig({
  vueQuery: {
    input: { target: OPENAPI_PATH },

    output: {
      target: './src/api/generated/index.ts',
      client: 'vue-query',
      clean: true,
    },

    hooks: {
      afterAllFilesWrite: 'pnpm run format',
    },
  },
});
