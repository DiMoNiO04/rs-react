import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/tests/setup.ts',
    css: false,
    coverage: {
      enabled: true,
      all: true,
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/types.ts', 'src/pages/_app.tsx', 'src/pages/_document.tsx'],
      thresholds: {
        statements: 80,
      },
    },
    silent: true,
    watch: false,
  },
});
