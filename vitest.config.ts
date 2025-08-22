import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    // explicitly include your test globs
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build', '.next'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    // globals: true, // so you don't have to import test/expect in every file
  },
});
