const { net } = require('electron');
import { readFileSync } from '@/utils/file';
import { cached, hasCacheSync } from '@/utils/cache';

export const getHtmlByNet = async (url) => {
  if (hasCacheSync(url)) {
    return readFileSync(url);
  }
  return new Promise((resolve, rej) => {
    const request = net.request(url);
    request.on('response', (response) => {
      let html = '';
      response.on('data', (chunk) => {
        html += chunk.toString('utf-8');
      });
      response.on('end', () => {
        cached(url, html);
        resolve(html);
      });
      response.on('error', () => {
        rej('错误');
      });
    });
    request.end();
  });
};

export const getBlob = (url) => {
  if (hasCacheSync(url)) {
    return readFileSync(url);
  }
  return new Promise((resolve, rej) => {
    const request = net.request(url);
    request.setHeader('content-type', 'image/jpeg');
    request.on('response', (response) => {
      let blob = Buffer.alloc(0);
      response.on('data', (chunk) => {
        blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
      });
      response.on('end', () => {
        cached(url, blob);
        resolve(blob);
      });
      response.on('error', () => {
        rej('错误');
      });
    });
    request.end();
  });
};
