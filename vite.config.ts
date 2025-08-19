import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://codechallenge.boohma.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // "/api/choices" -> "/choices"
        secure: false, // accept the self-signed API cert in dev
      },
    },
  },
})
