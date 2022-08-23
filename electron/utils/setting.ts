import fs from 'fs-extra';
const setFile = process.cwd() + '/config.json';
const staticFile = process.cwd() + '/methods.json';
import { config_ } from '../setting/config';

export const getSetting = (key: string) => {
  ensureSetFile();
  const res = String(fs.readFileSync(setFile));
  const set = JSON.parse(res);
  return set[key];
};
export const setSetting = (key: string, value: string[]) => {
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
export const getStaticSetting = (key: string) => {
  ensureStaticSetFile();
  const res = String(fs.readFileSync(staticFile));
  const set = JSON.parse(res);
  return set[key];
};
export const setStaticSetting = (key: string, value: string[]) => {
  ensureStaticSetFile();
  const res = String(fs.readFileSync(staticFile));
  const set = JSON.parse(res);
  set[key] = value;
  fs.writeFileSync(staticFile, JSON.stringify(set, null, 2));
};
export const ensureStaticSetFile = () => {
  const exists = fs.existsSync(staticFile);
  if (!exists) {
    fs.writeFileSync(staticFile, JSON.stringify(config_));
  }
};
