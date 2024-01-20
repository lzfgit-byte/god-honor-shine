import path from 'node:path';
import { unlinkSync } from 'node:fs';
import { Md5 } from 'ts-md5';
import { emptyDir, ensureFileSync, existsSync, readFileSync, writeFileSync } from 'fs-extra';
import { APP_PATHS } from '../const/app-paths';
import { isFalsity } from './KitUtil';

const CACHE_PATH = APP_PATHS.cache_path;

export const buildFilePathName = (fileName: string, suffix = '') =>
  CACHE_PATH + Md5.hashStr(fileName) + suffix;

export const getCachePath = () => CACHE_PATH;

export const saveCache = (fileName: string, data: any, suffix = '') => {
  ensureFileSync(buildFilePathName(fileName, suffix));
  writeFileSync(buildFilePathName(fileName, suffix), data, { encoding: 'utf-8' });
};
export const existsCache = (fileName: string, suffix = '') => {
  return existsSync(buildFilePathName(fileName, suffix));
};
export const getCache = (fileName: string, suffix = '') => {
  if (existsCache(fileName, suffix)) {
    return readFileSync(buildFilePathName(fileName, suffix), { encoding: 'utf-8' });
  }
  return false;
};

export const saveByteCache = (fileName: string, data: any, suffix = '') => {
  writeFileSync(buildFilePathName(fileName, suffix), data);
};
export const getByteCache = (fileName: string, suffix = '') => {
  if (existsCache(fileName, suffix)) {
    return readFileSync(buildFilePathName(fileName, suffix));
  }
  return false;
};

export const clearCache = (fileName: string, suffix = '') => {
  if (isFalsity(fileName)) {
    emptyDir(CACHE_PATH);
    return;
  }
  if (existsCache(fileName, suffix)) {
    unlinkSync(buildFilePathName(fileName, suffix));
  }
};
