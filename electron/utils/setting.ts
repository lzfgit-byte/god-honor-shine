import fs from 'fs-extra';
const setFile = process.cwd() + '/config.json';
import { config_ } from '../setting/config';

export const getSetting = (key: string) => {
  ensureSetFile();
  const res = String(fs.readFileSync(setFile));
  const set = JSON.parse(res);
  return set[key];
};
export const setSetting = (key: string, value: string) => {
  ensureSetFile();
  const res = String(fs.readFileSync(setFile));
  const set = JSON.parse(res);
  set[key] = value;
  fs.writeFileSync(setFile, JSON.stringify(set, null, 2));
};
export const ensureSetFile = () => {
  const exists = fs.existsSync(setFile);
  if (!exists) {
    fs.writeFileSync(setFile, JSON.stringify(config_), { encoding: 'utf-8' });
  }
};
