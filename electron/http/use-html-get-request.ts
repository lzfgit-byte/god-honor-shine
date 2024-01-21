import { net } from 'electron';
import { processMessage, sendMessage } from '../utils/message';
import { cache_exist, cache_get, cache_save } from '../utils/cache';

/**
 *使用electron的net获取html
 * @param url
 */
export const requestHtml = (url: string) => {
  const suffix = 'html';
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
        processMessage('received:', blob.length, fileSize);
      });
      response.on('end', () => {
        const html = String(blob);
        cache_save(url, html, suffix);
        resolve(html);
        sendMessage('end');
        blob = null;
      });
      response.on('error', () => {
        sendMessage('net 请求 error');
      });
    });
    request.on('error', () => {
      sendMessage('request error');
    });
    request.end();
  });
};

/**
 * 使用electron的net获取图片base64
 * @param url
 */
export const requestImage = (url: string) => {
  return new Promise((resolve) => {
    const request = net.request(url);
    let blob: any = Buffer.alloc(0);
    request.on('response', (response) => {
      const header = response.headers;
      let fileSize = +header['content-length'];
      response.on('data', (chunk) => {
        blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
        processMessage('received:', blob.length, fileSize);
      });
      response.on('end', () => {
        // saveByteCache(url, blob, suffix);
        const base64Image = `data:image/png;base64,${Buffer.from(blob).toString('base64')}`;
        resolve(base64Image);
        processMessage('received:', fileSize, fileSize);
        blob = null;
      });
      response.on('error', () => {
        sendMessage('net 请求 error');
      });
    });
    request.on('error', () => {
      sendMessage('request error');
    });
    request.end();
  });
};
