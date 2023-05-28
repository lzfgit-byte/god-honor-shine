import { join } from 'node:path';
import { BrowserWindow, ipcMain } from 'electron';
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

export const childWin = childWindow;
export default () => {};
