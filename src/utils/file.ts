import fs from 'fs-extra';
import { solvePath, solveName } from '@/utils/urls';
export interface fileMethods {
  writeFile: (name: string, data: any) => void;
  readFile: (name: any) => any;
  readFileSync: (name: string) => any;
  emptyDir: (dir: string) => any;
  deleteFile: (name: string) => any;
  hasFile: (name: string) => any;
}
export const writeFile = (name, data) => {
  fs.writeFileSync(solvePath(name), data, { encoding: 'utf-8' });
};
export const readFile = async (name) => {
  return fs.readFileSync(solvePath(name), { encoding: 'utf-8' });
};
export const readFileSync = (name) => {
  return fs.readFileSync(solvePath(solveName(name)), { encoding: 'utf-8' });
};
export const emptyDir = (dir) => {
  return fs.emptyDirSync(dir);
};
export const deleteFile = async (name) => {
  return fs.unlinkSync(solvePath(solveName(name)));
};

/**
 *是否存在文件
 * @param name
 */
export const hasFile = (name) => {
  return fs.pathExistsSync(solvePath(solveName(name)));
};
