import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import { hashString } from '@ilzf/utils';
import { MESSAGE_EVENT_KEY, SHORTCUTS } from '@ghs/constant';
import useProxySetting from '../setting/use-proxy-setting';
import { getMainWin } from '../main';
import { MessageUtil, NotifyMsgUtil } from '../utils/message';
import { resolvePreload } from '../utils/KitUtil';

const preHtmlDownload = resolvePreload('execute-js');
/**
 * 使用新窗口获取数据，执行外部传入code，执行完毕后关闭
 * @param code
 * @param url
 */
export const win_get_data = (code: string, url: string, show = false): Promise<any> => {
  if (!code || !url) {
    MessageUtil.info('没有执行代码');
    return;
  }
  const key = hashString(url);
  NotifyMsgUtil.sendNotifyMsg('executeJs', '开始', key);
  const pw = getMainWin();
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show,
    parent: pw,
    title: 'picWindow',
    webPreferences: {
      preload: preHtmlDownload,
      // nodeIntegration: true,
      // contextIsolation: false,
    },
  });
  useProxySetting(win);

  const webContents = win.webContents;
  if (show) {
    webContents.openDevTools();
  }
  globalShortcut.unregister(SHORTCUTS.OPEN_JS_WIN);
  globalShortcut.register(SHORTCUTS.OPEN_JS_WIN, () => {
    win?.show();
  });

  return new Promise((resolve) => {
    const keyEvt = 'executeJsInElectron';
    NotifyMsgUtil.sendNotifyMsg(keyEvt, '进入promise', key);
    const l = (se, arg) => {
      NotifyMsgUtil.sendNotifyMsg(keyEvt, arg, key);
    };
    ipcMain.removeHandler(MESSAGE_EVENT_KEY.SEND_EXECUTE_JS_MESSAGE);
    ipcMain.handle(MESSAGE_EVENT_KEY.SEND_EXECUTE_JS_MESSAGE, l);
    const listener = () => {
      NotifyMsgUtil.sendNotifyMsg(keyEvt, '开始执行', key);
      webContents
        .executeJavaScript(code)
        .then((res: string) => {
          if (res) {
            resolve(res);
            if (!show) {
              win?.destroy();
              globalShortcut.unregister(SHORTCUTS.OPEN_JS_WIN);
            }
          }
        })
        .catch((reason) => {
          NotifyMsgUtil.sendNotifyMsg(keyEvt, reason.toString(), key);
          win.show();
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

export const win_open = (url: string, code = '', width = 1200, height = 800) => {
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
    title: url,
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
