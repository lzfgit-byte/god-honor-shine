import * as fs from 'fs';
import { join, resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';

fs.rmSync('dist', { recursive: true, force: true }); // v14.14.0

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/index.ts',
      },
      preload: {
        input: {
          // Must be use absolute path, this is the restrict of Rollup
          preload: join(__dirname, 'electron/preload.ts'),
        },
      },
      renderer: {},
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~@': resolve(__dirname, './src'),
    },
  },
});
