import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@audio': path.resolve(__dirname, './src/assets/audio'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
    },
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // forward `/uploads/` endpoint to -> `http://localhost:5000/uploads/`
      '^/uploads': {
        target: 'http://localhost:5000/',
      },
    },
  },
});
