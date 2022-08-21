import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import electronRenderer from 'vite-plugin-electron/renderer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import polyfillExports from 'vite-plugin-electron/polyfill-exports';
import electronConfig from './vite-electron.config';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue(), electron(electronConfig), electronRenderer()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~@': resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
  },
});
