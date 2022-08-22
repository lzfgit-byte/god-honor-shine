import fs from 'fs-extra';
const setFile = process.cwd() + '/config.json';

export const getSetting = (key) => {
  const res = String(fs.readFileSync(setFile));
  const set = JSON.parse(res);
  return set[key];
};
export const setSetting = (key, value) => {
  const res = String(fs.readFileSync(setFile));
  const set = JSON.parse(res);
  set[key] = value;
  fs.writeFileSync(setFile, JSON.stringify(set, null, 2));
};
