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
}

export interface WebConfig extends BaseConfig {
  getUrlReplace: ($: CheerioAPI) => UrlReplace[]; // 获取首页条件更改时的 replace 列表
  getCurrentItems: ($: CheerioAPI) => Cheerio<Element>; // 获取页面所有的items
  getItemByEl: (el: Element, $: CheerioAPI) => Item; // 根据item 获取具体的详细信息
  getCurrentPagination: ($: CheerioAPI) => Cheerio<Element>; // 获取分页列表，item
  getPaginationByEl: (el: Element, $: CheerioAPI) => Pagination; // 转换为 分页数据
  getCurrentTags: ($: CheerioAPI) => Cheerio<Element>;
  getTagByEl: (el: Element, $: CheerioAPI) => Tag;
  getDetailInfo: (item: Item, cheerio: any) => DetailInfo;
}
