import path from 'path';
import fs from 'fs-extra';
import { Md5 } from 'ts-md5';

export const solveName = (name: string) => {
  let salt = '';
  if (name.indexOf('mp4') > -1) {
    salt = 'video';
  } else if (name.indexOf('html') > -1) {
    salt = 'html';
  } else if (
    name.indexOf('jpg') > -1 ||
    name.indexOf('png') > -1 ||
    name.indexOf('img') > -1 ||
    name.indexOf('jpeg') > -1 ||
    name.indexOf('image') > -1
  ) {
    salt = 'image';
  }
  return salt + Md5.hashStr(name);
};
export const solvePath = (path_: string) => {
  return path.join(getCacheDir(), path_);
};
export const getCacheDir = () => {
  const ghsPath = path.join(process.cwd(), '/ghs-cache/');
  fs.ensureDirSync(ghsPath);
  return ghsPath;
};
