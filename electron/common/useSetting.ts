import { ensureFileSync, readFileSync } from 'fs-extra';
import type { settingType } from '../type/types';

const configFile = `${process.cwd()}/config.json`;
const defaultConfig = { proxy: 'socks5://127.0.0.1:10801', needProxy: true };

const ensure = () => {
  ensureFileSync(configFile);
};
let setJson: settingType = defaultConfig;
const load = () => {
  ensure();
  const cStr = readFileSync(configFile, { encoding: 'utf-8' });
  if (cStr) {
    setJson = JSON.parse(cStr);
  }
};

export default (): settingType => {
  load();
  return setJson;
};
