import { net } from 'electron';
import { CacheFileType } from '@ghs/share';
import { cache_exist, cache_get, cache_save } from '../utils';
import { sendMessage } from '../utils/message';

export const request_string_get = (url: string, suffix = CacheFileType.blob): Promise<string> => {
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
      response.on('data', (chunk) => {
        blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
      });
      response.on('end', () => {
        resolve(cache_save(url, String(blob), suffix));
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
