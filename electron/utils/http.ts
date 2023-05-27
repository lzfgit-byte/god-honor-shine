import { net } from 'electron';
import { sendMessage } from './message';
import { getCache, saveCache } from './cache';
import { isTruth } from './KitUtil';

export const getHtml = (url: string) => {
  const suffix = 'html';
  return new Promise((resolve, reject) => {
    const h = getCache(url, suffix);
    if (isTruth(h)) {
      resolve(h);
      return;
    }
    const request = net.request(url);
    sendMessage('请求中');
    request.on('response', (response) => {
      let html = '';
      response.on('data', (chunk) => {
        html += chunk.toString('utf-8');
        sendMessage(`获取数据中:${html.length}`);
      });
      response.on('end', () => {
        resolve(html);
        saveCache(url, html, suffix);
        sendMessage('获取数据结束');
      });
      response.on('error', () => {
        reject('错误');
        sendMessage('错误:获取页面报错');
      });
    });
    request.end();
  });
};
