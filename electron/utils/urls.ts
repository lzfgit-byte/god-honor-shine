import replaceAll from 'string.prototype.replaceall';
import path from 'path';
import fs from 'fs-extra';
export const solveName = (name: string) => {
  return replaceAll(name, /:+\/+|\/|\.+|\?+/g, '');
};
export const solvePath = (path_: string) => {
  return path.join(getCacheDir(), path_);
};
export const getCacheDir = () => {
  const ghsPath = path.join(process.cwd(), '/ghs-cache/');
  fs.ensureDirSync(ghsPath);
  return ghsPath;
};
