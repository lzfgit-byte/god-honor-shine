import {
  writeFile,
  readFile,
  emptyDir,
  hasFile,
  deleteFile,
  appendFile,
  deleteFileEtc,
} from './file';
import { solveName, getCacheDir, solvePath } from './urls';
export interface cacheMethods {
  hasCache: (name: string) => any;
  cached: (name: any, data: any) => any;
  clearCache: () => any;
  hasCacheSync: (name: string) => any;
}
export const hasCache = async (name: any) => {
  return readFile(solveName(decodeURI(name)));
};
export const cached = (name: any, data: any) => {
  writeFile(solveName(decodeURI(name)), data);
};
export const cachedFileAppend = (name: any, data: any) => {
  appendFile(solveName(decodeURI(name)), data);
};
export const removeCachedExt = (name: any) => {
  deleteFileEtc(solveName(decodeURI(name)));
};
export const getCachePath = (name: any) => solvePath(solveName(decodeURI(name)));
export const clearCache = () => {
  emptyDir(getCacheDir());
};
export const hasCacheSync = (name: any) => {
  return hasFile(name);
};
export const removeCache = (url: string) => {
  return deleteFile(solveName(url));
};
