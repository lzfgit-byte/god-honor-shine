import path from 'node:path';
import { unlinkSync } from 'node:fs';
import { Md5 } from 'ts-md5';
import { emptyDir, ensureFileSync, readFileSync, removeSync, writeFileSync } from 'fs-extra';
import { isFalsity } from './KitUtil';

const CACHE_PATH = path.join(process.cwd(), '/ghs-cache/');

const buildFilePathName = (fileName, suffix = '') => CACHE_PATH + Md5.hashStr(fileName) + suffix;

export const getCachePath = () => CACHE_PATH;

export const saveCache = (fileName, data, suffix = '') => {
  writeFileSync(buildFilePathName(fileName, suffix), data, { encoding: 'utf-8' });
};

export const getCache = (fileName, suffix = '') => {
  ensureFileSync(buildFilePathName(fileName, suffix));
  return readFileSync(buildFilePathName(fileName, suffix), { encoding: 'utf-8' });
};

export const clearCache = (fileName, suffix = '') => {
  if (isFalsity(fileName)) {
    emptyDir(CACHE_PATH);
    return;
  }
  unlinkSync(buildFilePathName(fileName, suffix));
};
