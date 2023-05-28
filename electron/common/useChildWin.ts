import { join } from 'node:path';
import { BrowserWindow, ipcMain } from 'electron';
import { emit2render } from '../utils/event';
import useSetting from './use-setting';
const download = join(__dirname, '../preload/down-load.js');
let childWindow: BrowserWindow = null;
ipcMain.handle('open-win', (_, arg) => {
  childWindow = new BrowserWindow({
    width: 1450,
    height: 788,
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
ipcMain.handle('sync-done', (se, ...args) => {
  emit2render('sync-done');
});
ipcMain.handle('set-win', async (_, arg) => {
  childWindow.loadURL(arg);
});
export default () => {};
