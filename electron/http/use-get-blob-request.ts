import { net } from 'electron';
import { formatSize } from '@ilzf/utils';
import { cache_exist, cache_get, cache_save } from '../utils';
import { processMessage, sendMessage } from '../utils/message';

export const request_string_get = (url: string, suffix = ''): Promise<string> => {
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

export const request_mp4_data = (url: string, suffix = ''): Promise<any> => {
  return new Promise((resolve) => {
    const request = net.request(url);
    let blob: any = Buffer.alloc(0);
    request.on('response', (response) => {
      const header: any = response.headers;
      const length = header['content-length'];
      const filename = header.filename;
      response.on('data', (chunk) => {
        blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
        processMessage({
          title: `${formatSize(blob.length)}/${formatSize(length)}`,
          global: true,
          percentage: parseInt(((blob.length / length) * 100).toFixed(0)),
          key: url,
        });
      });
      response.on('end', () => {
        resolve(`data:video/mp4;base64,${Buffer.from(blob).toString('base64')}`);
        processMessage({
          title: filename,
          global: true,
          percentage: parseInt(((blob.length / length) * 100).toFixed(0)),
          key: url,
          down: true,
        });
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
