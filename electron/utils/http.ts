import { BrowserWindow, net } from 'electron';
import { loadAndRes } from '../common/use-child-win';
import useSetting from '../common/use-setting';
import { sendMessage } from './message';
import { getByteCache, getCache, saveByteCache, saveCache } from './cache';
import { isFalsity, isTruth } from './KitUtil';
// @ts-expect-error
import code from './img-windows-conde.ts?raw';
import { getImgBase64ByUrl } from './use-child-win-pic';

export const getHtml = (url: string) => {
  const suffix = 'html';
  return new Promise((resolve, reject) => {
    const h = getCache(url, suffix);
    if (isTruth(h)) {
      sendMessage('缓存命中');
      resolve(h);
      return;
    }
    const request = net.request(url);
    if (!net.online) {
      sendMessage('离线');
      reject('离线');
      return;
    }
    sendMessage(`请求中 ${url}`);
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

export const getHtmlByWin = (url: string) => {
  const suffix = 'html';
  return new Promise((resolve, reject) => {
    const h = getCache(url, suffix);
    if (isTruth(h)) {
      sendMessage('缓存命中');
      resolve(h);
      return;
    }
    sendMessage('异步 新win 获取中 ....');
    loadAndRes(url).then((html) => {
      sendMessage(`当前链接 ....${url}`);
      resolve(html);
    });
  });
};
export const getImageBase64ByWin = (url: string) => {
  const suffix = 'img';
  return new Promise((resolve, reject) => {
    if (isFalsity(url)) {
      reject('kong url');
      return;
    }
    const h = `${getCache(url, suffix)}`;
    if (isTruth(h) && h.length > 100) {
      resolve(h);
      return;
    }
    setTimeout(() => {
      getImgBase64ByUrl(url).then((r) => {
        saveCache(url, r, suffix);
        resolve(r);
      });
    }, Math.random() * 10 * 600);
  });
};
