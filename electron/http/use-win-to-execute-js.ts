import { BrowserWindow } from 'electron';
import { hashString } from '@ilzf/utils';
import useProxySetting from '../setting/use-proxy-setting';
import { getMainWin } from '../main';
import { MessageUtil, NotifyMsgUtil } from '../utils/message';

/**
 * 使用新窗口获取数据，执行外部传入code，执行完毕后关闭
 * @param code
 * @param url
 */
export const win_get_data = (code: string, url: string, show = false): Promise<any> => {
  if (!code || !url) {
    return;
  }
  const key = hashString(url);
  NotifyMsgUtil.sendNotifyMsg('executeJs', '开始', key);
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show,
    title: 'picWindow',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  useProxySetting(win);

  const webContents = win.webContents;
  webContents.openDevTools();
  return new Promise((resolve) => {
    NotifyMsgUtil.sendNotifyMsg('executeJs', '进入promise', key);
    const listener = () => {
      webContents
        .executeJavaScript(code)
        .then((res: string) => {
          if (res) {
            NotifyMsgUtil.sendNotifyMsg('executeJs', '获取到数据', key);
            resolve(res);
            win?.destroy();
          }
        })
        .catch((reason) => {
          NotifyMsgUtil.sendNotifyMsg('executeJs', reason.toString(), key);
        })
        .finally(() => {
          // webContents.off('did-finish-load', listener);
          // win?.destroy();
          NotifyMsgUtil.close(key);
        });
    };
    webContents.on('dom-ready', listener);
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
