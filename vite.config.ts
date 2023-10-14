import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'http://52.79.200.55:8080',
      '/address': {
        target: 'https://triptalk.xyz',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/address/, ''),
        secure: false,
        ws: true,
      },
    },
    port: 3000,
  },
});
