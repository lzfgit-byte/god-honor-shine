import { BrowserWindow } from 'electron';
import { logger } from '../utils';
import useProxySetting from '../setting/use-proxy-setting';
import { sendMessage } from '../utils/message';

export default (code: string, url: string) => {
  if (!code || !url) {
    return;
  }
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    title: 'picWindow',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  useProxySetting(win);
  const webContents = win.webContents;
  return new Promise((resolve) => {
    const listener = () => {
      webContents
        .executeJavaScript(code)
        .then((res: string) => {
          resolve(res);
        })
        .catch((reason) => {
          logger.db_error('失败', reason);
        })
        .finally(() => {
          webContents.off('did-finish-load', listener);
          win?.destroy();
        });
    };
    webContents.on('did-finish-load', listener);
    win.loadURL(url);
  });
};
