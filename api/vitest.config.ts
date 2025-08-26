import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup/global.ts'],
    fileParallelism: false,
    env: {
      NODE_ENV: 'test',
    },
  },
});
