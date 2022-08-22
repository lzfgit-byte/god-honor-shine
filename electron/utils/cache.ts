import { writeFile, readFile, emptyDir, hasFile } from './file';
import { solveName, getCacheDir } from './urls';
export interface cacheMethods {
  hasCache: (name: string) => any;
  cached: (name: any, data: any) => any;
  clearCache: () => any;
  hasCacheSync: (name: string) => any;
}
export const hasCache = async (name) => {
  return readFile(solveName(decodeURI(name)));
};
export const cached = (name, data) => {
  writeFile(solveName(decodeURI(name)), data);
};
export const clearCache = () => {
  emptyDir(getCacheDir());
};
export const hasCacheSync = (name) => {
  return hasFile(name);
};
