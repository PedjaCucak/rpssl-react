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
        target: 'https://localhost:7181',
        changeOrigin: true,
        secure: false, // accept the self-signed API cert in dev
      },
    },
  },
})
