import { join } from 'node:path';
import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import useWinProxy from '../hook/useWinProxy';
import { HTML_WIN_EVENT, SYS_SHORT_CUT } from '../const/system';
const download = join(__dirname, '../preload/down-load.js');
const video = join(__dirname, '../preload/video.js');
let childWindow: BrowserWindow = null;
let parent = null;
ipcMain.handle('open-win', (_, arg) => {
  childWindow = new BrowserWindow({
    width: 1450,
    height: 788,
    parent,
    webPreferences: {
      preload: download,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  useWinProxy(childWindow);
  globalShortcut.register(SYS_SHORT_CUT.showHtmlGetWin, function () {
    childWindow?.show();
  });
  globalShortcut.register(SYS_SHORT_CUT.hideHtmlGetWin, function () {
    childWindow?.hide();
  });
  childWindow?.hide();
});
ipcMain.handle(HTML_WIN_EVENT.SHOW_HTML_GET_WIN, () => {
  childWindow?.show();
});
ipcMain.handle(HTML_WIN_EVENT.HIDE_HTML_GET_WIN, () => {
  childWindow?.hide();
});
export const showChildWin = () => {
  childWindow?.show();
};
export const hideChildWin = () => {
  if (childWindow.isVisible()) {
    childWindow.hide();
  }
};

export const loadAndRes = async (url: string) => {
  return new Promise((resolve) => {
    childWindow.loadURL(url);
    const func = (se, html) => {
      hideChildWin();
      resolve(html);
    };
    ipcMain.removeHandler(HTML_WIN_EVENT.SEND_HTML);
    ipcMain.handle(HTML_WIN_EVENT.SEND_HTML, func);
  });
};
export default (win: BrowserWindow) => {
  parent = win;
  return () => childWindow?.destroy();
};
// 打开新窗口
ipcMain.handle('open-win-only', (_, arg) => {
  const sChildWindow = new BrowserWindow({
    width: 900,
    height: 788,
    parent,
    webPreferences: {
      preload: video,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  useWinProxy(sChildWindow);
  sChildWindow.loadURL(arg);
  // childWindow.webContents.openDevTools();
});
