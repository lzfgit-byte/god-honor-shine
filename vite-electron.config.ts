import path, { join } from 'path';
import { defineConfig } from 'vite-plugin-electron';

export default defineConfig({
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
});
