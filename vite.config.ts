import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

const ReactCompilerConfig = {
  target: '19',
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@audio': path.resolve(__dirname, './src/assets/audio'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tsconfigPaths(),
  ],
});
