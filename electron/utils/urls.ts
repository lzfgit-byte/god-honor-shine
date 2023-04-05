import path from 'path';
import fs from 'fs-extra';
import { Md5 } from 'ts-md5';

export const solveName = (name: string) => {
  return Md5.hashStr(name);
};
export const solvePath = (path_: string) => {
  return path.join(getCacheDir(), path_);
};
export const getCacheDir = () => {
  const ghsPath = path.join(process.cwd(), '/ghs-cache/');
  fs.ensureDirSync(ghsPath);
  return ghsPath;
};
