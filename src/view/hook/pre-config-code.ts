export const preConfigCode = `export interface Pagination {
  url: string;
  title: string;
  isCurrent: boolean;
}
export interface Tag {
  title?: string;
  url?: string;
}
export enum ItemType {
  video = 'video',
  image = 'image',
  text = 'text',
  comic = 'comic',
}
// 将上边枚举转换为联合类型
export type ItemTypeUnion = keyof typeof ItemType;
export enum ItemDetailType {
  mp4 = 'mp4',
  m3u8 = 'm3u8',
  image = 'image',
  win = 'win',
  comic = 'comic',
}
// 将上边枚举转换为联合类型
export type ItemDetailTypeUnion = keyof typeof ItemDetailType;
export enum RenderType {
  force = 'force',
  normal = 'normal',
}
// 将上边枚举转换为联合类型
export type RenderTypeUnion = keyof typeof RenderType;
export interface Detail {
  type?: ItemDetailTypeUnion;
  url?: string;
  fullUrl?: string;
  quality?: string;
  title?: string;
  comments?: Comment[];
}
export interface Item {
  coverImg: string;
  title: string;
  type: ItemTypeUnion;
  jumpUrl: string;
  renderType: RenderTypeUnion; // 渲染类型,强制渲染,正常渲染
  tags: Tag[];
}
export interface UrlAppend {
  value: string;
  param: string;
  title: string; // 展示的名字
  current: boolean; // 是否当前的过滤条件
}
export interface UrlReplace {
  schema: string; // 分组
  urlAppend: UrlAppend[];
}
export interface Comment {
  datetime: string;
  comment: string;
}
/**
 *点击Item,后获取详细信息
 */
export interface DetailInfo {
  detailType: ItemDetailTypeUnion;
  renderType: RenderTypeUnion; // 渲染类型,强制渲染,正常渲染
  details: Detail[];
  relations: Item[];
}

/**
 * 每一页的类型
 */
export interface Page {
  pagination: Pagination[]; // 分页
  tags: Tag[];
  items: Item[];
  urlReplace?: UrlReplace[];
}

type SetTag = '标签' | '收藏' | '历史' | '过滤选项' | '系统配置' | '日志' | '配置';
interface BaseConfig {
  key: string;
  favicon: string;
  homeUrl: string;
  name: string;
  searchUrl: string;

  imgWidth: string;
  imgHeight: string;

  drawWidth: string;
  historyRemember: number;

  setTags: SetTag[];

  ifWinExecCode?: string;
  winWidth?: number;
  winHeight?: number;

  currentUrlReplace: any[];
}

export interface WebConfig extends BaseConfig {
  getUrlReplace: ($) => UrlReplace[]; // 获取首页条件更改时的 replace 列表

  // 获取页面元素
  getItems: ($) => Item[];
  // 获取分页数据
  getPagination: ($) => Pagination[];
  // 获取全部分类
  getTags: ($) => Tag[];

  getDetailInfo: (item: Item, cheerio: any) => Promise<any>;

  // 处理排序等问题时调用
  adapterLoadUrl: (url: string, urlReplaces: UrlReplace[]) => string;
  // 处理搜索问题时调用
  adapterSearchUrl: (url: string, item: Item) => string;
  // adapter
  adapterRemoteSearch?: (searchKey: string) => string[];
}
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
};
export interface MessageInfo {
  key?: string;
  msg?: string;
  percentage?: number;
  title?: string;
  type?: 'error' | 'info' | 'success' | 'warning';
  close?: boolean;
}

export class MessageUtil {
  static info(msg: string) {
    this.sendMsg({ type: 'info', msg });
  }

  static error(msg: string) {
    this.sendMsg({ type: 'error', msg });
  }

  static success(msg: string) {
    this.sendMsg({ type: 'success', msg });
  }

  static warning(msg: string) {
    this.sendMsg({ type: 'warning', msg });
  }

  private static sendMsg(msg: MessageInfo) {}
}

/**
 * 发送步骤信息
 */
export class StepMessageUtil {
  static key: 'step_msg_key';
  private static sendMsg(msg: MessageInfo) {}

  static sendStepMsg(title: string, msg: string, key: string) {
    this.sendMsg({ msg, title, key });
  }

  static closeStepMsg(title: string, msg: string, key: string) {
    this.sendMsg({ msg, title, key, close: true });
  }
}

/**
 *发送侧边信息
 */
export class NotifyMsgUtil {
  private static sendMsg(msg: MessageInfo) {}

  static sendNotifyMsg(title: string, msg: string, key: string) {
    this.sendMsg({ msg, title, key });
  }

  static close(key: string) {
    this.sendMsg({ close: true, key, msg: 'done', title: 'done' });
  }
}

/**
 *发送一时的日志信息
 */
export class LogMsgUtil {
  private static sendMsg(msg: MessageInfo) {}

  static sendLogMsg(...msg: string[]) {}

  static close() {
    this.sendMsg({ close: true });
  }
}

/**
 * 发送进度信息
 */
export class ProgressMsgUtil {
  private static sendMsg(msg: MessageInfo) {}

  static sendProgressMsg(msg: MessageInfo) {
    this.sendMsg(msg);
  }

  static sendProgress(percentage: number, key: string, title?: string, msg?: string) {
    this.sendMsg({ percentage, key, title, msg });
  }

  static close(key: string) {
    this.sendMsg({ percentage: 100, close: true, key });
  }
}

export class ConsoleLogUtil {
  private static sendMsg(msg: MessageInfo) {
  }
  static sendLogMsg(...msg: string[]) {
  }
}
export const eventEmitter = {
  on: (event: string, callback: (...args: any[]) => void) => {},
  off: (event: string, callback: (...args: any[]) => void) => {},
  emit: (event: string, ...args: any[]) => {},
};

function getHtml(str: string) {
  return str;
}
async function getHtmlWithProcess(url: string) {
  return '';
}
`;
