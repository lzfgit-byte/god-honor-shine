import * as fs from 'fs';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import electronConfig from './vite-electron.config';

fs.rmSync('dist', { recursive: true, force: true }); // v14.14.0

export default defineConfig({
  plugins: [vue(), electron(electronConfig), renderer()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~@': resolve(__dirname, './src'),
    },
  },
});
