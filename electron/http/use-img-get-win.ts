import { BrowserWindow } from 'electron';
import { logger } from '../utils/logger';

import useProxySetting from '../setting/use-proxy-setting';
// @ts-ignore
import code from './img-windows-conde?raw';
const childWinds: { win: BrowserWindow; free: boolean }[] = [];
const getWinIndex = (win: BrowserWindow) => childWinds.findIndex((item) => item.win.id === win.id);
/**
 *切换标志位
 * @param win
 * @param flag
 */
const toggleWinStatus = (win: BrowserWindow, flag: boolean) => {
  const index = getWinIndex(win);
  if (index >= 0) {
    childWinds[index].free = flag;
  }
};
// 创建一个新的Win
const createNewWin = async () => {
  const sChildWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    title: 'picWindow',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  childWinds.push({ win: sChildWindow, free: false });
  logger.log('new', sChildWindow.id, '  ', childWinds.length);
  useProxySetting(sChildWindow);
  return sChildWindow;
};
const getAFreeWin = async (): Promise<BrowserWindow> => {
  const index = childWinds.findIndex((item) => item.free);
  if (index > -1) {
    childWinds[index].free = false;
    return childWinds[index].win;
  }
  return createNewWin();
};
export const getImgBase64 = async (url: string) => {
  const win = await getAFreeWin();
  win.loadURL(url);
  const webContents = win.webContents;

  return new Promise((resolve) => {
    const listener = () => {
      webContents
        .executeJavaScript(code)
        .then((res: string) => {
          resolve(res);
        })
        .catch((reason) => {
          logger.error('获取图片失败', reason);
        })
        .finally(() => {
          toggleWinStatus(win, true);
          logger.log(`获取成功：${url}`);
          webContents.off('did-finish-load', listener);
        });
    };
    webContents.on('did-finish-load', listener);
  });
};
export default () => {
  return () => {
    childWinds?.forEach((item) => {
      item?.win?.close();
    });
  };
};
