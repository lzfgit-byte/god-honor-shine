import type { CheerioAPI } from 'cheerio';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import type { DetailInfo, Item, Pagination, Tag, UrlReplace } from '@/business/index';

export interface BaseConfig {
  key: string;
  favicon: string;
  homeUrl: string;
  name: string;
  searchUrl: string;
  searchKey: string;

  imgWidth: string;
  imgHeight: string;
}

export interface WebConfig extends BaseConfig {
  getUrlReplace: ($: CheerioAPI) => UrlReplace[]; // 获取首页条件更改时的 replace 列表

  // 获取页面元素
  getItems: ($: CheerioAPI) => Item[];
  // 获取分页数据
  getPagination: ($: CheerioAPI) => Pagination[];
  // 获取全部分类
  getTags: ($: CheerioAPI) => Tag[];

  getDetailInfo: (item: Item, cheerio: any) => Promise<DetailInfo> | Promise<any>;

  // 处理排序等问题时调用
  adapterLoadUrl: (url: string) => string;
  // 处理搜索问题时调用
  adapterSearchUrl: (url: string) => string;
}
