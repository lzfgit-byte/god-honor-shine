import path from 'node:path';
import { readFileSync } from 'node:fs';
import { ensureFileSync, writeFileSync } from 'fs-extra';
import { app } from 'electron';
let config_json = null;
let db_dir = `${process.env.LOCALAPPDATA}\\ghs3.0`;
const cache_path = path.join(process.cwd(), '\\ghs-cache\\');
const config_path = path.join(db_dir, '\\config.json');

const loadConfigFile = () => {
  if (config_json) {
    return;
  }
  const default_config = { db_path: `${process.env.LOCALAPPDATA}\\ghs3.0\\sqlite.db` };
  ensureFileSync(config_path);
  const setJson = readFileSync(config_path, { encoding: 'utf-8' });
  if (setJson === '') {
    writeFileSync(config_path, JSON.stringify(default_config, null, 2), { encoding: 'utf-8' });
    config_json = default_config;
  } else {
    config_json = JSON.parse(setJson);
  }
};
export const app_set_config_dir = (dir: string) => {
  config_json.db_path = dir;
  writeFileSync(config_path, JSON.stringify(config_json, null, 2), { encoding: 'utf-8' });
  app.relaunch();
  app.quit();
};
export class APP_PATHS {
  static get db_dir() {
    return db_dir;
  }

  static get db_path() {
    loadConfigFile();
    // aka C:\Users\用户名\AppData\Local\ghs3.0
    return config_json.db_path;
  }

  static get cache_path() {
    return cache_path;
  }
}
