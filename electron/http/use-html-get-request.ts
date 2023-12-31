import { net } from 'electron';
import { processMessage, sendMessage } from '../utils/message';

export const requestHtml = (url: string) => {
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
        resolve(String(blob));
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
