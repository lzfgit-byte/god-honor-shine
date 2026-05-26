import { BrowserWindow } from 'electron';
import { isFalsity } from '@ilzf/utils';
import { FileType } from '@ghs/types';
import { cache_exist, cache_get, cache_save } from '../utils';
import useProxySetting from '../setting/use-proxy-setting';
import useSystemSetting from '../setting/use-system-setting';
import { logger } from '../utils/logger';
import { LogMsgUtil } from '../utils/message';
// @ts-ignore
import code from './img-windows-code?raw';
let parentWin: BrowserWindow;

const childWinds: { win: BrowserWindow; free: boolean }[] = [];
const getWinIndex = (win: BrowserWindow) => childWinds.findIndex((item) => item.win.id === win.id);
const browserMd5HashStrCode = `
function(input) {
  function add32(a, b) {
    return (a + b) & 0xffffffff;
  }
  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }
  function md5cycle(state, block) {
    let a = state[0];
    let b = state[1];
    let c = state[2];
    let d = state[3];
    a = ff(a, b, c, d, block[0], 7, -680876936);
    d = ff(d, a, b, c, block[1], 12, -389564586);
    c = ff(c, d, a, b, block[2], 17, 606105819);
    b = ff(b, c, d, a, block[3], 22, -1044525330);
    a = ff(a, b, c, d, block[4], 7, -176418897);
    d = ff(d, a, b, c, block[5], 12, 1200080426);
    c = ff(c, d, a, b, block[6], 17, -1473231341);
    b = ff(b, c, d, a, block[7], 22, -45705983);
    a = ff(a, b, c, d, block[8], 7, 1770035416);
    d = ff(d, a, b, c, block[9], 12, -1958414417);
    c = ff(c, d, a, b, block[10], 17, -42063);
    b = ff(b, c, d, a, block[11], 22, -1990404162);
    a = ff(a, b, c, d, block[12], 7, 1804603682);
    d = ff(d, a, b, c, block[13], 12, -40341101);
    c = ff(c, d, a, b, block[14], 17, -1502002290);
    b = ff(b, c, d, a, block[15], 22, 1236535329);
    a = gg(a, b, c, d, block[1], 5, -165796510);
    d = gg(d, a, b, c, block[6], 9, -1069501632);
    c = gg(c, d, a, b, block[11], 14, 643717713);
    b = gg(b, c, d, a, block[0], 20, -373897302);
    a = gg(a, b, c, d, block[5], 5, -701558691);
    d = gg(d, a, b, c, block[10], 9, 38016083);
    c = gg(c, d, a, b, block[15], 14, -660478335);
    b = gg(b, c, d, a, block[4], 20, -405537848);
    a = gg(a, b, c, d, block[9], 5, 568446438);
    d = gg(d, a, b, c, block[14], 9, -1019803690);
    c = gg(c, d, a, b, block[3], 14, -187363961);
    b = gg(b, c, d, a, block[8], 20, 1163531501);
    a = gg(a, b, c, d, block[13], 5, -1444681467);
    d = gg(d, a, b, c, block[2], 9, -51403784);
    c = gg(c, d, a, b, block[7], 14, 1735328473);
    b = gg(b, c, d, a, block[12], 20, -1926607734);
    a = hh(a, b, c, d, block[5], 4, -378558);
    d = hh(d, a, b, c, block[8], 11, -2022574463);
    c = hh(c, d, a, b, block[11], 16, 1839030562);
    b = hh(b, c, d, a, block[14], 23, -35309556);
    a = hh(a, b, c, d, block[1], 4, -1530992060);
    d = hh(d, a, b, c, block[4], 11, 1272893353);
    c = hh(c, d, a, b, block[7], 16, -155497632);
    b = hh(b, c, d, a, block[10], 23, -1094730640);
    a = hh(a, b, c, d, block[13], 4, 681279174);
    d = hh(d, a, b, c, block[0], 11, -358537222);
    c = hh(c, d, a, b, block[3], 16, -722521979);
    b = hh(b, c, d, a, block[6], 23, 76029189);
    a = hh(a, b, c, d, block[9], 4, -640364487);
    d = hh(d, a, b, c, block[12], 11, -421815835);
    c = hh(c, d, a, b, block[15], 16, 530742520);
    b = hh(b, c, d, a, block[2], 23, -995338651);
    a = ii(a, b, c, d, block[0], 6, -198630844);
    d = ii(d, a, b, c, block[7], 10, 1126891415);
    c = ii(c, d, a, b, block[14], 15, -1416354905);
    b = ii(b, c, d, a, block[5], 21, -57434055);
    a = ii(a, b, c, d, block[12], 6, 1700485571);
    d = ii(d, a, b, c, block[3], 10, -1894986606);
    c = ii(c, d, a, b, block[10], 15, -1051523);
    b = ii(b, c, d, a, block[1], 21, -2054922799);
    a = ii(a, b, c, d, block[8], 6, 1873313359);
    d = ii(d, a, b, c, block[15], 10, -30611744);
    c = ii(c, d, a, b, block[6], 15, -1560198380);
    b = ii(b, c, d, a, block[13], 21, 1309151649);
    a = ii(a, b, c, d, block[4], 6, -145523070);
    d = ii(d, a, b, c, block[11], 10, -1120210379);
    c = ii(c, d, a, b, block[2], 15, 718787259);
    b = ii(b, c, d, a, block[9], 21, -343485551);
    state[0] = add32(a, state[0]);
    state[1] = add32(b, state[1]);
    state[2] = add32(c, state[2]);
    state[3] = add32(d, state[3]);
  }
  function md5blk(str) {
    const block = [];
    for (let i = 0; i < 64; i += 4) {
      block[i >> 2] = str.charCodeAt(i) + (str.charCodeAt(i + 1) << 8) + (str.charCodeAt(i + 2) << 16) + (str.charCodeAt(i + 3) << 24);
    }
    return block;
  }
  function md51(str) {
    let n = str.length;
    const state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    for (i = 64; i <= n; i += 64) {
      md5cycle(state, md5blk(str.substring(i - 64, i)));
    }
    str = str.substring(i - 64);
    const tail = new Array(16).fill(0);
    for (i = 0; i < str.length; i += 1) {
      tail[i >> 2] |= str.charCodeAt(i) << ((i % 4) << 3);
    }
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i += 1) {
        tail[i] = 0;
      }
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }
  function rhex(n) {
    const hex = '0123456789abcdef';
    let str = '';
    for (let j = 0; j < 4; j += 1) {
      str += hex.charAt((n >> (j * 8 + 4)) & 0x0f) + hex.charAt((n >> (j * 8)) & 0x0f);
    }
    return str;
  }
  function hex(state) {
    return state.map(rhex).join('');
  }
  const value = unescape(encodeURIComponent(String(input)));
  return hex(md51(value));
}
`;
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
    parent: parentWin,
    title: 'picWindow',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  childWinds.push({ win: sChildWindow, free: false });
  LogMsgUtil.sendLogMsg('new', `${sChildWindow.id}`, `${childWinds.length}`);
  useProxySetting(sChildWindow);
  return sChildWindow;
};
const getAFreeWin = async (): Promise<BrowserWindow> => {
  const index = childWinds.findIndex((item) => item.free);
  if (index > -1) {
    childWinds[index].free = false;
    return childWinds[index].win;
  }
  const { imgWinMax } = await useSystemSetting();
  if (childWinds.length > imgWinMax) {
    LogMsgUtil.sendLogMsg('创建的窗口超限制了，等待其他资源释放');
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        const index = childWinds.findIndex((item) => item.free);
        if (index > -1) {
          childWinds[index].free = false;
          resolve(childWinds[index].win);
          clearInterval(timer);
        }
      }, 200);
    });
  }
  return createNewWin();
};
let alwaysSend = 0;
const timer = setInterval(async () => {
  const { imgWinMin } = await useSystemSetting();
  if (childWinds.length > 0) {
    if (alwaysSend !== childWinds.length) {
      LogMsgUtil.sendLogMsg('现在运行的子窗口的数量是:', `${childWinds.length}`);
      alwaysSend = childWinds.length;
    }

    for (let i = childWinds.length - 1; i > imgWinMin; i--) {
      if (childWinds[i].free) {
        childWinds[i].win.close();
        logger.log(`释放了一个后台窗口，现在长度是:${childWinds.length}`);
        childWinds.splice(i, 1);
        break;
      }
    }
  }
}, 5000);

/**
 *根据传入的url 获取其中图片的base64代码
 * @param url
 */
export const getImgBase64ByWin = async (url: string): Promise<string> => {
  if (isFalsity(url)) {
    return;
  }
  if (cache_exist(url, FileType.IMAGE)) {
    return Promise.resolve(cache_get(url, FileType.IMAGE) || '');
  }
  const win = await getAFreeWin();
  const webContents = win.webContents;
  return new Promise((resolve) => {
    const listener = () => {
      webContents
        .executeJavaScript(code)
        .then((res: string) => {
          if (res === '') {
            resolve(res);
            return;
          }
          cache_save(url, FileType.IMAGE);
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
    win.loadURL(url);
  });
};
export const adapterImageBase64ByWin = async (
  url: string,
  adapterImageCode: string,
  extra: Record<string, any> = {}
): Promise<string> => {
  if (isFalsity(url)) {
    return '';
  }
  const win = await getAFreeWin();
  const webContents = win.webContents;
  const execCode = `
(async () => {
  try {
    const sourceUrl = ${JSON.stringify(url)};
    const adapterCode = ${JSON.stringify(adapterImageCode)};
    const extra = ${JSON.stringify(extra || {})};
    const sourceImage = document.querySelector('img');
    if (!sourceImage) {
      return '';
    }

    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = sourceImage.naturalWidth || sourceImage.width;
    sourceCanvas.height = sourceImage.naturalHeight || sourceImage.height;
    const sourceContext = sourceCanvas.getContext('2d');
    if (!sourceContext || !sourceCanvas.width || !sourceCanvas.height) {
      return '';
    }
    sourceContext.drawImage(sourceImage, 0, 0, sourceCanvas.width, sourceCanvas.height);

    const imgSrc = {
      value: sourceCanvas.toDataURL('image/jpeg', 1)
    };
    const canvas = {
      value: document.createElement('canvas')
    };
    const Md5 = {
      hashStr: ${browserMd5HashStrCode}
    };
    const NativeImage = window.Image;
    let pendingImages = 0;
    window.Image = class extends NativeImage {
      constructor() {
        super();
        pendingImages += 1;
        const done = () => {
          pendingImages = Math.max(0, pendingImages - 1);
        };
        this.addEventListener('load', done, { once: true });
        this.addEventListener('error', done, { once: true });
      }
    };

    try {
      const adapter = new Function(adapterCode)();
      const result = adapter?.(imgSrc, extra, Md5, sourceUrl, canvas);
      if (result && typeof result.then === 'function') {
        const value = await result.catch(() => '');
        if (typeof value === 'string') {
          imgSrc.value = value;
        }
      }

      await new Promise((resolve) => {
        let times = 0;
        const timer = setInterval(() => {
          times += 1;
          if (pendingImages === 0 || times > 200) {
            clearInterval(timer);
            resolve(undefined);
          }
        }, 50);
      });

      return imgSrc.value || '';
    } finally {
      window.Image = NativeImage;
    }
  } catch (error) {
    return '';
  }
})()
`;
  return new Promise((resolve) => {
    let finished = false;
    const done = (value = '') => {
      if (finished) {
        return;
      }
      finished = true;
      toggleWinStatus(win, true);
      webContents.off('did-finish-load', listener);
      webContents.off('did-fail-load', failListener);
      resolve(value);
    };
    const listener = () => {
      webContents
        .executeJavaScript(execCode)
        .then((res: string) => {
          done(res || '');
        })
        .catch((reason) => {
          logger.error('adapter image execute error', reason);
          done('');
        });
    };
    const failListener = (_event, _errorCode, _errorDescription, _validatedURL, isMainFrame) => {
      if (isMainFrame) {
        done('');
      }
    };
    webContents.on('did-finish-load', listener);
    webContents.on('did-fail-load', failListener);
    win.loadURL(url).catch((reason) => {
      logger.error('adapter image load error', reason);
      done('');
    });
  });
};

export default (win: BrowserWindow) => {
  parentWin = win;
  return () => {
    childWinds?.forEach((item) => {
      item?.win?.close();
    });
    clearInterval(timer);
  };
};
