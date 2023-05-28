import { join } from 'node:path';
import { BrowserWindow, ipcMain } from 'electron';
import useSetting from './use-setting';
const download = join(__dirname, '../preload/down-load.js');
let childWindow: BrowserWindow = null;
let parent = null;
ipcMain.handle('open-win', (_, arg) => {
  childWindow = new BrowserWindow({
    width: 1450,
    height: 788,
    parent,
    minimizable: true,
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
});

export const loadAndRes = async (url: string) => {
  return new Promise((resolve) => {
    ipcMain.removeHandler('sync-done');
    childWindow.loadURL(url);
    ipcMain.handle('sync-done', (se, html) => {
      resolve(html);
    });
  });
};
export default (win: BrowserWindow) => {
  parent = win;
  return () => childWindow?.destroy();
};
