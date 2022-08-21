import replaceAll from 'string.prototype.replaceall';
import path from "path";
import fs from 'fs-extra';
export const solveName = (name) => {
  return replaceAll(name, /:+\/+|\/|\.+|\?+/g, '');
};
export const solvePath = (path_) => {
  return path.join(getCacheDir(), path_);
};
export const getCacheDir = () => {
  const ghsPath = path.join(process.cwd(), '/ghs-cache/');
  fs.ensureDirSync(ghsPath);
  return ghsPath;
};

