import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { resolvePreload, resolvePublic } from '../utils/KitUtil';
import { HTML_WIN_EVENT, SYSTEM_SHORT_CUT, SYS_GLOB_KEY } from '../const/system';
import { sendMessage } from '../utils/message';
import useProxySetting from '../hooks/use-proxy-setting';

const preHtmlDownload = resolvePreload('html-download');
let htmlGetWin: BrowserWindow;

export const requestHtmlByWin = async (url: string) => {
  return new Promise((resolve) => {
    const func = (se: any, html: string) => {
      htmlGetWin.hide();
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
