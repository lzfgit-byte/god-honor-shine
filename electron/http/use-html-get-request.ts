import { net } from 'electron';
import { CacheFileType } from '@ghs/share';
import { processMessage, sendMessage } from '../utils/message';
import { cache_exist, cache_get, cache_save } from '../utils/cache';
import { logger } from '../utils/logger';
import { isFalsity } from '../utils/KitUtil';

const requestFunc = (url: string, suffix: string, apply: (data: any) => any) => {
  return new Promise((resolve) => {
    if (cache_exist(url, suffix)) {
      const cache = cache_get(url, suffix);
      resolve(cache || '');
      return;
    }
    const request = net.request(url);
    let blob: any = Buffer.alloc(0);
    request.on('response', (response) => {
      const header = response.headers;
      let fileSize = +header['content-length'];
      response.on('data', (chunk) => {
        blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
        processMessage(`【${suffix}】数据请求`, blob.length, fileSize, url);
      });
      response.on('end', () => {
        resolve(cache_save(url, apply(blob), suffix));
        processMessage(`【${suffix}】数据请求`, fileSize, fileSize, url);
        blob = null;
      });
      response.on('error', () => {
        logger.db_error('请求失败', url);
      });
    });
    request.on('error', () => {
      sendMessage('request error', 'error');
    });
    request.end();
  });
};

/**
 *使用electron的net获取html
 * @param url
 */
export const requestHtml = (url: string) => {
  if (isFalsity(url)) {
    return;
  }
  return requestFunc(url, CacheFileType.html, (blob) => String(blob));
};

/**
 * 使用electron的net获取图片base64
 * @param url
 */
export const requestImage = (url: string) => {
  if (isFalsity(url)) {
    return;
  }
  return requestFunc(
    url,
    CacheFileType.img,
    (blob) => `data:image/png;base64,${Buffer.from(blob).toString('base64')}`
  );
};
