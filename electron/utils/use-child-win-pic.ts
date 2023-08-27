import { clearInterval } from 'node:timers';
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
const isHaveFree = () => childWinds.some((item) => item.free);
const getFreeWind = () => {
  return new Promise((resolve, reject) => {
    const index = childWinds.findIndex((item) => item.free);
    if (index >= 0) {
      childWinds[index].free = false;
      resolve(childWinds[index].win);
    } else {
      reject();
    }
  });
};
const useWinGet = (sChildWindow: BrowserWindow, url: string) => {
  return new Promise((resolve) => {
    sChildWindow.loadURL(url);
    const webContents = sChildWindow.webContents;

    const listener = () => {
      webContents
        .executeJavaScript(code)
        .then((r) => {
          resolve(r);
        })
        .catch(() => {
          resolve('err');
        })
        .finally(() => {
          toggleWinStatus(sChildWindow, true);
          console.log('toogle -> free true id:', sChildWindow.id);
          webContents.off('did-finish-load', listener);
        });
    };
    webContents.on('did-finish-load', listener);
  });
};
export const getImgBase64ByUrl = (url: string) => {
  return new Promise((resolve) => {
    getFreeWind()
      .then((win) => {
        useWinGet(win, url).then((res) => {
          resolve(res);
          console.log('cache->', 'id:', win.id, 'length: ', childWinds.length);
          console.log(childWinds.map((item) => item.win.id));
        });
      })
      .catch(() => {
        const sChildWindow = new BrowserWindow({
          width: 1920,
          height: 1080,
          show: false,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          },
        });
        childWinds.push({ win: sChildWindow, free: false });
        console.log('new', sChildWindow.id, '  ', childWinds.length);
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
  });
};
const timer = setInterval(() => {
  if (childWinds.length > 0) {
    for (let i = childWinds.length - 1; i > 20; i--) {
      if (childWinds[i].free) {
        childWinds[i].win.close();
        console.log('clear ->id', childWinds[i]?.win?.id, childWinds.length);
        childWinds.splice(i, 1);
        console.log('afterclear ->', childWinds.length);
        break;
      }
    }
  }
}, 1000);
export default () => {
  return () => {
    childWinds?.forEach((item) => {
      item?.win?.close();
    });
    clearInterval(timer);
  };
};
