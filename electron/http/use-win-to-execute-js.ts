import { BrowserWindow } from 'electron';
import { logger } from '../utils';
import useProxySetting from '../setting/use-proxy-setting';
import { sendMessage } from '../utils/message';

export const win_get_data = (code: string, url: string) => {
  if (!code || !url) {
    return;
  }
  sendMessage(`使用新窗口获取数据-->${url}`);
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
          sendMessage(`新窗口获取数据结束,数据长度-->${res?.length}`);
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

export const win_open = (url: string, code = '', width = 800, height = 800) => {
  if (!url) {
    return;
  }
  const win = new BrowserWindow({
    width,
    height,
    show: true,
    title: 'picWindow',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  useProxySetting(win);
  const webContents = win.webContents;
  const listener = () => {
    webContents
      .executeJavaScript(code)
      .then((res: string) => {})
      .catch((reason) => {})
      .finally(() => {
        webContents.off('dom-ready', listener);
      });
  };
  if (code) {
    webContents.on('dom-ready', listener);
  }
  win.loadURL(url);
};
