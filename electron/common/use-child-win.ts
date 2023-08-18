import { join } from 'node:path';
import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import useSetting from './use-setting';
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
  const { proxy, needProxy } = useSetting();
  const webContent = childWindow.webContents;
  const session = webContent.session;
  if (needProxy && proxy) {
    session.setProxy({ proxyRules: proxy });
  }
  globalShortcut.register('ctrl+shift+s', function () {
    childWindow?.show();
  });
  globalShortcut.register('ctrl+shift+h', function () {
    childWindow?.hide();
  });
  childWindow.hide();
});
const reDonload = () => {
  childWindow.webContents.send('re-download');
};
ipcMain.handle('show-child-win', () => {
  childWindow.show();
});
export const showChildWin = () => {
  childWindow.show();
};
export const hideChildWin = () => {
  if (childWindow.isVisible()) {
    childWindow.hide();
  }
};

export const loadAndRes = async (url: string) => {
  return new Promise((resolve) => {
    childWindow.loadURL(url);
    ipcMain.removeHandler('sync-done');
    ipcMain.handle('sync-done', (se, html) => {
      hideChildWin();
      resolve(html);
    });
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
  const { proxy, needProxy } = useSetting();
  const webContent = sChildWindow.webContents;
  const session = webContent.session;
  if (needProxy && proxy) {
    session.setProxy({ proxyRules: proxy });
  }
  sChildWindow.loadURL(arg);
  // childWindow.webContents.openDevTools();
});
