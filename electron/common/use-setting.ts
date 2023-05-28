import { ensureFileSync, readFileSync, writeFileSync } from 'fs-extra';
import type { settingType } from '../type/types';

const configFile = `${process.cwd()}/config.json`;
const defaultConfig = { proxy: 'socks5://127.0.0.1:10808', needProxy: true };

const ensure = () => {
  ensureFileSync(configFile);
};

let setJson: settingType = defaultConfig;
const writeSetting = () => {
  ensure();
  writeFileSync(configFile, JSON.stringify(setJson, null, 2), { encoding: 'utf-8' });
};
const load = () => {
  ensure();
  const cStr = readFileSync(configFile, { encoding: 'utf-8' });
  if (cStr) {
    setJson = JSON.parse(cStr);
  } else {
    writeFileSync(configFile, JSON.stringify(defaultConfig, null, 2), { encoding: 'utf-8' });
    setJson = defaultConfig;
  }
};
export const getSetting = (key: string) => {
  load();
  return setJson[key];
};
export const setSetting = (key, value) => {
  load();
  setJson[key] = value;
  writeSetting();
};

export default (): settingType => {
  load();
  return setJson;
};
