import { BrowserWindow } from 'electron';
import useProxySetting from '../setting/use-proxy-setting';
import { getMainWin } from '../main';

/**
 * 使用新窗口获取数据，执行外部传入code，执行完毕后关闭
 * @param code
 * @param url
 */
export const win_get_data = (code: string, url: string): Promise<any> => {
  if (!code || !url) {
    return;
  }
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
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
        .catch((reason) => {})
        .finally(() => {
          webContents.off('did-finish-load', listener);
          win?.destroy();
        });
    };
    webContents.on('did-finish-load', listener);
    win.loadURL(url);
  });
};

/**
 * 打开新窗口，并执行相应的代码。不会关闭
 */

export const win_open = (url: string, code = '', width = 800, height = 800) => {
  if (!url) {
    return;
  }
  const winW = getMainWin();
  const win = new BrowserWindow({
    width,
    height,
    parent: winW,
    show: true,
    modal: true,
    title: 'newWindow',
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
