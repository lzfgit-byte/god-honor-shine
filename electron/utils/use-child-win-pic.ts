import { clearInterval } from 'node:timers';
import { BrowserWindow } from 'electron';
import useSetting from '../common/use-setting';
// @ts-expect-error
import code from './img-windows-conde.ts?raw';
import { logger } from './logger';
let parent = null;
const { proxy, needProxy, picWinLimit: picLimit } = useSetting();
let picWinLimit = JSON.parse(picLimit);
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
          logger.log(`释放picwin 为可用 winid为:${sChildWindow.id}`);
          webContents.off('did-finish-load', listener);
        });
    };
    webContents.on('did-finish-load', listener);
  });
};
export const getImgBase64ByUrl = (url: string) => {
  return new Promise((resolve) => {
    if (childWinds.length >= picWinLimit[1]) {
      logger.log(
        `超过最大限制，不再创建新的窗口，已创建数量 ${childWinds.length},限制${picWinLimit[1]}`
      );
      const timer = setInterval(() => {
        getFreeWind()
          .then((win: any) => {
            useWinGet(win, url).then((res) => {
              resolve(res);
              logger.log(
                `使用已经创建的cache->id:${win.id} 总创建的：length: ${childWinds.length}`
              );
              logger.log(`winIds:${childWinds.map((item) => item.win.id).join(',')}`);
              clearInterval(timer);
            });
          })
          .catch(() => {});
      }, 100);
      return;
    }
    getFreeWind()
      .then((win: any) => {
        useWinGet(win, url).then((res) => {
          resolve(res);
          logger.log(`使用已经创建的cache->id:${win.id} 总创建的：length: ${childWinds.length}`);
          logger.log(`winIds:${childWinds.map((item) => item.win.id).join(',')}`);
        });
      })
      .catch(() => {
        const sChildWindow = new BrowserWindow({
          width: 800,
          height: 600,
          show: false,
          title: 'picWindow',
          parent,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          },
        });
        childWinds.push({ win: sChildWindow, free: false });
        logger.log('new', sChildWindow.id, '  ', childWinds.length);
        const webContent = sChildWindow.webContents;
        const session = webContent.session;
        if (needProxy && proxy) {
          session.setProxy({ proxyRules: proxy });
          useWinGet(sChildWindow, url).then((res) => {
            resolve(res);
          });
        } else {
          useWinGet(sChildWindow, url).then((res) => {
            resolve(res);
          });
        }
      });
  });
};
const timer = setInterval(() => {
  const { picWinLimit: picLimit } = useSetting();
  picWinLimit = JSON.parse(picLimit);
  if (childWinds.length > 0) {
    for (let i = childWinds.length - 1; i > picWinLimit[0]; i--) {
      if (childWinds[i].free) {
        childWinds[i].win.close();
        logger.log(`clear ->id${childWinds[i]?.win?.id}:剩余长度${childWinds.length}`);
        childWinds.splice(i, 1);
        logger.log(`afterClear ->剩余长度${childWinds.length},窗口限制配置${picWinLimit}`);
        break;
      }
    }
  }
}, 1000);
export default (win = null) => {
  parent = win;
  return () => {
    childWinds?.forEach((item) => {
      item?.win?.close();
    });
    clearInterval(timer);
  };
};
