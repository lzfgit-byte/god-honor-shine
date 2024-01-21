import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { CacheFileType, HTML_WIN_EVENT, SYSTEM_SHORT_CUT, SYS_GLOB_KEY } from '@ghs/share';
import { resolvePreload, resolvePublic } from '../utils/KitUtil';
import { sendMessage } from '../utils/message';
import useProxySetting from '../setting/use-proxy-setting';
import { cache_exist, cache_get, cache_save } from '../utils/cache';

const preHtmlDownload = resolvePreload('html-download');
let htmlGetWin: BrowserWindow;

export const requestHtmlByWin = async (url: string) => {
  return new Promise((resolve) => {
    if (cache_exist(url, CacheFileType.html)) {
      resolve(cache_get(url, CacheFileType.html));
      return;
    }
    const func = (se: any, html: string) => {
      htmlGetWin.hide();
      cache_save(url, html, CacheFileType.html);
      resolve(html);
    };
    ipcMain.removeHandler(HTML_WIN_EVENT.SEND_HTML);
    ipcMain.handle(HTML_WIN_EVENT.SEND_HTML, func);
    htmlGetWin.loadURL(url);
  });
};
export default () => {
  htmlGetWin = new BrowserWindow({
    width: 1450,
    height: 788,
    icon: resolvePublic('favicon.ico'),
    webPreferences: {
      preload: preHtmlDownload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  htmlGetWin.hide();
  useProxySetting(htmlGetWin);
  globalShortcut.register(SYSTEM_SHORT_CUT.showHtmlGetWin, function () {
    htmlGetWin?.show();
  });
  globalShortcut.register(SYSTEM_SHORT_CUT.hideHtmlGetWin, function () {
    htmlGetWin?.hide();
  });
  ipcMain.handle(HTML_WIN_EVENT.SHOW_HTML_GET_WIN, () => {
    htmlGetWin.show();
  });
  ipcMain.handle(HTML_WIN_EVENT.HIDE_HTML_GET_WIN, () => {
    htmlGetWin.hide();
  });
  ipcMain.handle(SYS_GLOB_KEY.SEND_MESSAGE, (s, a) => {
    sendMessage(a);
  });
  return () => htmlGetWin.destroy();
};
