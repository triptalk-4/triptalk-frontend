import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDevelopment = process.env.NODE_ENV === 'development';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: isDevelopment ? {
      // '/api': 'http://52.79.200.55:8080',
      '/address': {
        target: 'https://triptalk.xyz',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/address/, ''),
        secure: false,
        ws: true,
      },
    } : {},
    port: 3000,
  },
});
