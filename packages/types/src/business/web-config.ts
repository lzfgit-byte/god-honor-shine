import type { CheerioAPI } from 'cheerio';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import type { DetailInfo, Item, Pagination, Tag, UrlAppend, UrlReplace } from '@/business/index';

export type SetTag = '标签' | '收藏' | '历史' | '过滤选项' | '系统配置' | '日志';
export interface BaseConfig {
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

  currentUrlReplace: UrlReplace[];
}

export interface WebConfig extends BaseConfig {
  getUrlReplace: ($: CheerioAPI) => UrlReplace[]; // 获取首页条件更改时的 replace 列表

  // 获取页面元素
  getItems: ($: CheerioAPI) => Item[];
  // 获取分页数据
  getPagination: ($: CheerioAPI) => Pagination[];
  // 获取全部分类
  getTags: ($: CheerioAPI) => Tag[];

  getDetailInfo: (item: Item, cheerio: any) => Promise<DetailInfo>;

  // 处理排序等问题时调用
  adapterLoadUrl: (url: string, urlReplaces: UrlReplace[]) => string;
  // 处理搜索问题时调用
  adapterSearchUrl: (url: string, item: Item) => string;
  // adapter
  adapterRemoteSearch?: (searchKey: string) => string[];
}
