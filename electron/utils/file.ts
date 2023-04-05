import fs from 'fs-extra';
import { solvePath, solveName } from './urls';
export interface fileMethods {
  writeFile: (name: string, data: any) => void;
  readFile: (name: any) => any;
  readFileSync: (name: string) => any;
  emptyDir: (dir: string) => any;
  deleteFile: (name: string) => any;
  hasFile: (name: string) => any;
}
export const writeFile = (name: string, data: any) => {
  fs.writeFileSync(solvePath(name), data, { encoding: 'utf-8' });
};
export const readFile = async (name: string) => {
  return fs.readFileSync(solvePath(name), { encoding: 'utf-8' });
};
export const readFileSync = (name: string) => {
  return fs.readFileSync(solvePath(solveName(name)), { encoding: 'utf-8' });
};
export const emptyDir = (dir: string) => {
  return fs.emptyDirSync(dir);
};
export const deleteFile = async (name: string) => {
  fs.ensureFileSync(solvePath(solveName(name)));
  return fs.unlinkSync(solvePath(solveName(name)));
};

/**
 *是否存在文件
 * @param name
 */
export const hasFile = (name: string) => {
  return fs.pathExistsSync(solvePath(solveName(name)));
};
export const formatSize = (size: any, pointLength = 2, units: any = null) => {
  let unit;
  units = units || ['B', 'K', 'M', 'G'];
  unit = units.shift();
  while (unit && size > 1024) {
    size = size / 1024;
    unit = units.shift();
  }
  return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit;
};
