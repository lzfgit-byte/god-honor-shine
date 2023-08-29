import { ensureFileSync, readFileSync, writeFileSync } from 'fs-extra';
import { keys } from 'lodash';
import type { settingType } from '../type/types';
const appFilePath = `${process.env.LOCALAPPDATA}/ghs`;
const configFile = `${appFilePath}/config.json`;
const defaultConfig: settingType = {
  proxy: 'socks5://127.0.0.1:10808',
  needProxy: true,
  picWinLimit: [8, 20],
};

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
    const setJsonKeys = keys(setJson);
    const defaultKeys = keys(defaultConfig);
    defaultKeys.forEach((key) => {
      if (!setJsonKeys.includes(key)) {
        setJson[key] = defaultConfig[key];
      }
    });
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
export const getAppDataPath = () => appFilePath;

export const getAllSet: Record<string, any> = () => setJson;

export default (): settingType => {
  load();
  return setJson;
};
