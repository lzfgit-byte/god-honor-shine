import { sendMessage } from './message';

const { net } = require('electron');
import { readFileSync } from './file';
import { cached, hasCacheSync } from './cache';

export const getHtmlByNet = async (url: any) => {
  sendMessage('请求页面:' + url);
  if (hasCacheSync(url)) {
    sendMessage('缓存命中:' + url);
    return readFileSync(url);
  }
  return new Promise((resolve, rej) => {
    const request = net.request(url);
    sendMessage('请求中');
    request.on('response', (response) => {
      let html = '';
      response.on('data', (chunk) => {
        html += chunk.toString('utf-8');
        sendMessage('获取数据中:' + html.length);
      });
      response.on('end', () => {
        cached(url, html);
        resolve(html);
        sendMessage('获取数据结束');
      });
      response.on('error', () => {
        rej('错误');
        sendMessage('错误:获取页面报错');
      });
    });
    request.end();
  });
};
/**
 * 解决为Buffer
 * @param url
 */
export const getBlob = (url: any) => {
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

//
