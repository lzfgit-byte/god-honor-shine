import { join } from 'node:path';
import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import useSetting from './use-setting';
const download = join(__dirname, '../preload/down-load.js');
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
  const { proxy, needProxy } = useSetting();
  const webContent = childWindow.webContents;
  const session = webContent.session;
  if (needProxy && proxy) {
    session.setProxy({ proxyRules: proxy });
  }
  globalShortcut.register('ctrl+shift+s', function () {
    childWindow.show();
  });
  globalShortcut.register('ctrl+shift+h', function () {
    childWindow.hide();
  });
  childWindow.hide();
});
export const showChildWin = () => {
  childWindow.show();
};
export const hideChildWin = () => {
  childWindow.hide();
};

export const loadAndRes = async (url: string) => {
  return new Promise((resolve) => {
    childWindow.loadURL(url);
    ipcMain.handle('sync-done', (se, html) => {
      resolve(html);
    });
    ipcMain.removeHandler('sync-done');
  });
};
export default (win: BrowserWindow) => {
  parent = win;
  return () => childWindow?.destroy();
};
