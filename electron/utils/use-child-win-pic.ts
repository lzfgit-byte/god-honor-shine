import { BrowserWindow } from 'electron';
import { forEach } from 'lodash';
import useSetting from '../common/use-setting';
// @ts-expect-error
import code from './img-windows-conde.ts?raw';

const childWinds: { win: BrowserWindow; free: boolean }[] = [];
const getWinIndex = (win) => childWinds.findIndex((item) => item.win === win);
const toggleWinStatus = (win, flag) => {
  const index = getWinIndex(win);
  if (index >= 0) {
    childWinds[index].free = flag;
  }
};
const getFreeWind = () => {
  return new Promise((resolve, reject) => {
    const index = childWinds.findIndex((item) => item.free);
    if (index >= 0) {
      resolve(childWinds[index].win);
    } else {
      reject();
    }
  });
};
const useWinGet = (sChildWindow: BrowserWindow, url: string) => {
  return new Promise((resolve) => {
    sChildWindow.loadURL(url);
    sChildWindow.webContents.on('did-finish-load', () => {
      sChildWindow.webContents
        .executeJavaScript(code)
        .then((r) => {
          resolve(r);
        })
        .catch(() => {
          resolve('err');
        })
        .finally(() => {
          if (childWinds.length > 5) {
            forEach(childWinds, (item, index) => {
              if (index < childWinds.length - 5) {
                item.win.close();
              }
            });
            childWinds.slice(childWinds.length - 5);
          } else {
            toggleWinStatus(sChildWindow, true);
          }
        });
    });
  });
};
export const getImgBase64ByUrl = (url: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      getFreeWind()
        .then((win) => {
          useWinGet(win, url).then((res) => {
            resolve(res);
            console.log('cache->', childWinds.length);
          });
        })
        .catch(() => {
          const sChildWindow = new BrowserWindow({
            width: 900,
            height: 788,
            show: false,
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
            },
          });
          childWinds.push({ win: sChildWindow, free: false });
          const { proxy, needProxy } = useSetting();
          const webContent = sChildWindow.webContents;
          const session = webContent.session;
          if (needProxy && proxy) {
            session.setProxy({ proxyRules: proxy });
            useWinGet(sChildWindow, url).then((res) => {
              resolve(res);
            });
          }
        });
    }, 1000);
  });
};
export default () => {
  return () => {
    childWinds?.forEach((item) => {
      item?.win?.close();
    });
  };
};
