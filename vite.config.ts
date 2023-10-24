import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDevelopment = process.env.NODE_ENV === 'development';
// https://vitejs.dev/config/
const developmentProxy = {
  '/address': {
    target: 'https://triptalk.xyz',
    changeOrigin: true,
    rewrite: path => path.replace(/^\/address/, ''),
    secure: false,
    ws: true,
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: isDevelopment ? developmentProxy : {},
    port: 3000,
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
});
