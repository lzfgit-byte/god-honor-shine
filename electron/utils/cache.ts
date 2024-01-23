import path from 'node:path';
import { unlinkSync } from 'node:fs';
import { Md5 } from 'ts-md5';
import {
  emptyDirSync,
  ensureFileSync,
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'fs-extra';
import type { CacheFileType } from '@ghs/share';
import { APP_PATHS } from '../const/app-paths';
import { isFalsity } from './KitUtil';
import { sendMessage } from './message';

const CACHE_PATH = APP_PATHS.cache_path;

export const buildCacheFilePath = (fileName: string, suffix = '') => {
  return CACHE_PATH + Md5.hashStr(fileName) + suffix;
};
/**
 *判断是否缓存是否存在
 * @param fileName
 * @param suffix
 */
export const cache_exist = (fileName: string, suffix = '') => {
  return existsSync(buildCacheFilePath(fileName, suffix));
};
/**
 *保存缓存，字符串
 * @param fileName
 * @param data
 * @param suffix
 */
export const cache_save = (fileName: string, data: any, suffix = ''): string => {
  ensureFileSync(buildCacheFilePath(fileName, suffix));
  writeFileSync(buildCacheFilePath(fileName, suffix), data, { encoding: 'utf-8' });
  return data;
};
/**
 *获取缓存,字符串
 * @param fileName
 * @param suffix
 */
export const cache_get = (fileName: string, suffix = '') => {
  if (cache_exist(fileName, suffix)) {
    return readFileSync(buildCacheFilePath(fileName, suffix), { encoding: 'utf-8' });
  }
  return false;
};
/**
 *保存缓存字节 byte
 * @param fileName
 * @param data
 * @param suffix
 */
export const cache_byte_save = (fileName: string, data: any, suffix = ''): any => {
  writeFileSync(buildCacheFilePath(fileName, suffix), data);
  return data;
};
/**
 *获取缓存 byte
 * @param fileName
 * @param suffix
 */
export const cache_byte_get = (fileName: string, suffix = '') => {
  if (cache_exist(fileName, suffix)) {
    return readFileSync(buildCacheFilePath(fileName, suffix));
  }
  return false;
};
/**
 *清理缓存 删除特定名字的缓存
 * @param fileName
 * @param suffix
 */
export const cache_clean = (fileName?: string, suffix?: string) => {
  if (isFalsity(fileName)) {
    emptyDirSync(CACHE_PATH);
    return;
  }
  if (cache_exist(fileName, suffix)) {
    unlinkSync(buildCacheFilePath(fileName, suffix));
  }
};
/**
 * 根据特定后缀去删除文件
 * @param fileSuffix
 */
export const cache_suffix_clean = (fileSuffix: CacheFileType) => {
  if (!fileSuffix) {
    emptyDirSync(CACHE_PATH);
    sendMessage('清除了所有缓存');
    return;
  }
  const filePaths = readdirSync(CACHE_PATH);
  const needRemoves = filePaths?.filter((file) => file.endsWith(fileSuffix));
  needRemoves.forEach((file) => {
    const filePath = path.join(CACHE_PATH, file);
    unlinkSync(filePath);
  });
  sendMessage(`清除了缓存--${fileSuffix}`);
};
