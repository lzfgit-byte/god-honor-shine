import { businessText, webConfigText } from '@ghs/types';
const wrapperCode = (code: string) => {
  let cs = code.split('\n');
  cs = cs
    .filter((item) => {
      return !item.startsWith('import ') && !item.includes('export *') && !item.includes(`//`);
    })
    .map((item) => item.replace('CheerioAPI', 'any'));
  return cs.join('');
};
const flattCode = (code: string) => {
  return code.split('\n').join('').split('\r').join('');
};
const preConfigCode_ = `${wrapperCode(businessText)} 
${wrapperCode(webConfigText)}
export const ElementAttr = {
  src: 'src',
  title: 'title',
  href: 'href',
  class: 'class',
  dataWebp: 'data-webp',
  dataSrc: 'data-src',
  dataOriginal: 'data-original',
  poster: 'poster',
  dataSource: 'data-source',
  dataType: 'data-type',
  dataEcho: 'data-echo',
  dataError: 'data-error',
  alt: 'alt',
};
/**
 * 元素类型枚举
 */
export const ElementTypes = {
  a: 'a',
  img: 'img',
  h4: 'h4',
  h1: 'h1',
  video: 'video',
  source: 'source',
  p: 'p',
};
export const helpElAttr = ($el: any, attr: string): string => {
  return $el?.attr(attr) || '';
};
export const helpElText = ($el: any): string => {
  return $el?.text() || '';
};
export const hashString = (str: string) => {
  return '';
};export interface MessageInfo {
  key?: string;
  msg?: string;
  percentage?: number;
  title?: string;
  type?: 'error' | 'info' | 'success' | 'warning';
  close?: boolean;
}
export class MessageUtil {
  static info(msg: string) {}
  static error(msg: string) {}
  static success(msg: string) {}
  static warning(msg: string) {}
  private static sendMsg(msg: MessageInfo) {}
}
export class StepMessageUtil {
  static key: 'step_msg_key';
  private static sendMsg(msg: MessageInfo) {}
  static sendStepMsg(title: string, msg: string, key: string) {this.sendMsg({ msg, title, key });}
  static closeStepMsg(title: string, msg: string, key: string) {this.sendMsg({ msg, title, key, close: true });}
}
export class NotifyMsgUtil {
  private static sendMsg(msg: MessageInfo) {}
  static sendNotifyMsg(title: string, msg: string, key: string) {this.sendMsg({ msg, title, key });}
  static close(key: string) {this.sendMsg({ close: true, key, msg: 'done', title: 'done' });}
}
export class LogMsgUtil {
  private static sendMsg(msg: MessageInfo) {}
  static sendLogMsg(...msg: string[]) {}
  static close() { this.sendMsg({ close: true }); }
}
export class ProgressMsgUtil {
  private static sendMsg(msg: MessageInfo) {}
  static sendProgressMsg(msg: MessageInfo) {this.sendMsg(msg);}
  static sendProgress(percentage: number, key: string, title?: string, msg?: string) { this.sendMsg({ percentage, key, title, msg }); }
  static close(key: string) { this.sendMsg({ percentage: 100, close: true, key });}
}
export class ConsoleLogUtil {
  private static sendMsg(msg: MessageInfo) {}
  static sendLogMsg(...msg: string[]) {}
}
export const eventEmitter = {
  on: (event: string, callback: (...args: any[]) => void) => {},
  off: (event: string, callback: (...args: any[]) => void) => {},
  emit: (event: string, ...args: any[]) => {},
};function getHtml(str: string) {return str;}
async function getHtmlWithProcess(url: string) {return '';}
`;

export const preConfigCode = flattCode(preConfigCode_);
export const defaultWebConfig = `
const getData = (): WebConfig => /* break */ ({
  key: 'demo',
  name: 'demo',
  favicon: 'https://demo.com/favicon.ico',
  homeUrl: '',
  searchUrl: '',
  imgWidth: '220px',
  imgHeight: '147px',

  drawWidth: \`${3.5 * 220}px\`,
  historyRemember: 100,

  setTags: ['标签', '收藏', '历史', '系统配置', '日志'],

  currentUrlReplace: null,

  getUrlReplace($) {
    return [];
  },
  getItems($) {
    const res = [];
    $('#thumbContainer .thumb').each((i, el) => {
      const $el = $(el);
      res.push({
        jumpUrl,
        title,
        coverImg,
        type: isVideo ? 'video' : 'image',
        renderType: 'normal',
        tags: flatTags.filter((item) => item.title),
      });
    });

    return res;
  },

  getPagination($) {
    const res = [];
    $('#more-hentai li').each((i, el) => {
      const $el = $(el);
      res.push({ title, isCurrent, url });
    });
    return res;
  },
  getTags($) {
    const res = [];
    $('#tags > li').each((i, el) => {
      const $el = $(el);
      res.push({ title, url });
    });
    return res;
  },
  async getDetailInfo(item, cheerio) {
     return {
      detailType: 'win',
      renderType: 'normal',
      details: [
        {
          type: 'win',
          url: item.jumpUrl,
          fullUrl: '',
          title: item.title,
        },
      ],
      relations: [],
    };
  },
  adapterLoadUrl(url) {
    return url;
  },
  adapterSearchUrl(key) {
    key = key.replace(' ', '+');
    return this.searchUrl + key;
  },
});
`;
