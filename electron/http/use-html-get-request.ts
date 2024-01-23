import { net } from 'electron';
import { CacheFileType, SHOW_FILE_SIZE } from '@ghs/share';
import { processMessage, sendMessage } from '../utils/message';
import { cache_exist, cache_get, cache_save } from '../utils/cache';
import { logger } from '../utils/logger';
import { formatSize, isFalsity } from '../utils/KitUtil';
const sendMsg = (fileSize: number, suffix: string, blob: Buffer, url: string) => {
  if (fileSize && fileSize > SHOW_FILE_SIZE) {
    processMessage({
      title: `【${suffix}】数据请求 ${formatSize(fileSize)}`,
      percentage: +((blob.length / fileSize) * 100).toFixed(0),
      key: url,
      global: true,
    });
  } else {
    sendMessage(`【${suffix}】数据请求${url} ${formatSize(blob.length)}`);
  }
};
const requestFunc = (url: string, suffix: string, apply: (data: any) => any) => {
  return new Promise((resolve) => {
    if (cache_exist(url, suffix)) {
      const cache = cache_get(url, suffix);
      resolve(cache || '');
      return;
    }

    if (suffix === CacheFileType.html) {
      sendMessage(`${CacheFileType.html}请求开始->${url}`);
    }
    const request = net.request(url);

    let blob: any = Buffer.alloc(0);
    request.on('response', (response) => {
      const header = response.headers;
      let fileSize = +header['content-length'];
      response.on('data', (chunk) => {
        blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
        sendMsg(fileSize, suffix, blob, url);
      });
      response.on('end', () => {
        resolve(cache_save(url, apply(blob), suffix));
        sendMsg(fileSize, suffix, blob, url);
        blob = null;
      });
      response.on('error', () => {
        sendMessage(`请求失败远程${url}`);
      });
    });
    request.on('error', () => {
      sendMessage(`请求失败远程${url}`);
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
export const requestImage = async (url: string) => {
  if (isFalsity(url)) {
    return;
  }
  return requestFunc(
    url,
    CacheFileType.img,
    (blob) => `data:image/png;base64,${Buffer.from(blob).toString('base64')}`
  );
};
