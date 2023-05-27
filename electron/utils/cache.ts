import path from 'node:path';
import { unlinkSync } from 'node:fs';
import { Md5 } from 'ts-md5';
import { emptyDir, ensureFileSync, existsSync, readFileSync, writeFileSync } from 'fs-extra';
import { isFalsity } from './KitUtil';

const CACHE_PATH = path.join(process.cwd(), '/ghs-cache/');

const buildFilePathName = (fileName, suffix = '') => CACHE_PATH + Md5.hashStr(fileName) + suffix;

export const getCachePath = () => CACHE_PATH;

export const saveCache = (fileName, data, suffix = '') => {
  ensureFileSync(buildFilePathName(fileName, suffix));
  writeFileSync(buildFilePathName(fileName, suffix), data, { encoding: 'utf-8' });
};
export const existsCache = (fileName, suffix = '') => {
  return existsSync(buildFilePathName(fileName, suffix));
};
export const getCache = (fileName, suffix = '') => {
  if (existsCache(fileName, suffix)) {
    return readFileSync(buildFilePathName(fileName, suffix), { encoding: 'utf-8' });
  }
  return false;
};

export const saveByteCache = (fileName, data, suffix = '') => {
  writeFileSync(buildFilePathName(fileName, suffix), data);
};
export const getByteCache = (fileName, suffix = '') => {
  if (existsCache(fileName, suffix)) {
    return readFileSync(buildFilePathName(fileName, suffix));
  }
  return false;
};

export const clearCache = (fileName, suffix = '') => {
  if (isFalsity(fileName)) {
    emptyDir(CACHE_PATH);
    return;
  }
  unlinkSync(buildFilePathName(fileName, suffix));
};
