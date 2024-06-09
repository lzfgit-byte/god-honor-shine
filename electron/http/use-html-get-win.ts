import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { isFalsity } from '@ilzf/utils';
import { FileType } from '@ghs/types';
import { MESSAGE_EVENT_KEY, SHORTCUTS, USE_CHILD_WIN_EVENT } from '@ghs/constant';
import { resolvePreload, resolvePublic } from '../utils/KitUtil';
import { sendMessage } from '../utils/message';
import useProxySetting from '../setting/use-proxy-setting';
import { cache_exist, cache_get, cache_save } from '../utils/cache';

const preHtmlDownload = resolvePreload('html-download');
let htmlGetWin: BrowserWindow;

export const requestHtmlByWin = async (url: string) => {
  if (isFalsity(url)) {
    return;
  }
  return new Promise((resolve) => {
    if (cache_exist(url, FileType.HTML)) {
      resolve(cache_get(url, FileType.HTML));
      return;
    }
    const func = (se: any, html: string) => {
      htmlGetWin.hide();
      cache_save(url, html, FileType.HTML);
      resolve(html);
    };
    ipcMain.removeHandler(USE_CHILD_WIN_EVENT.SEND_HTML);
    ipcMain.handle(USE_CHILD_WIN_EVENT.SEND_HTML, func);
    htmlGetWin.loadURL(url);
  });
};
export default (win: BrowserWindow) => {
  htmlGetWin = new BrowserWindow({
    width: 1450,
    height: 788,
    parent: win,
    icon: resolvePublic('favicon.ico'),
    webPreferences: {
      preload: preHtmlDownload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  htmlGetWin.hide();
  useProxySetting(htmlGetWin);
  // 注册打开html窗口快捷键
  globalShortcut.register(SHORTCUTS.SHOW_HTML_WIN, function () {
    htmlGetWin?.show();
  });
  // 注册关闭html窗口快捷键
  globalShortcut.register(SHORTCUTS.HIDE_HTML_WIN, function () {
    htmlGetWin?.hide();
  });
  ipcMain.handle(USE_CHILD_WIN_EVENT.SHOW_WIN, () => {
    htmlGetWin.show();
  });
  ipcMain.handle(USE_CHILD_WIN_EVENT.HIDE_WIN, () => {
    htmlGetWin.hide();
  });
  ipcMain.handle(MESSAGE_EVENT_KEY.SEND_MESSAGE, (s, a) => {
    sendMessage(a);
  });
  return () => htmlGetWin.destroy();
};
