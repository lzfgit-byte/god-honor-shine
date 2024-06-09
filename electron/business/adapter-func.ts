import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import type { DetailInfo, Item, Pagination, Tag } from '@ghs/types';
import type { UrlReplace } from '@ghs/types/src';
import type { CheerioAPI } from 'cheerio';
import { NormalFunc } from './common-func';

export abstract class AdapterFunc extends NormalFunc {
  abstract getUrlReplace($: CheerioAPI): UrlReplace[];

  abstract getCurrentItems($: CheerioAPI): Cheerio<Element>;
  abstract getItemByEl(el: Element, $: CheerioAPI): Item;

  abstract getCurrentPagination($: CheerioAPI): Cheerio<Element>;
  abstract getPaginationByEl(el: Element, $: CheerioAPI): Pagination;

  abstract getCurrentTags($: CheerioAPI): Cheerio<Element>;
  abstract getTagByEl(el: Element, $: CheerioAPI): Tag;

  abstract getDetailInfo(item: Item, cheerio: any): DetailInfo;
}
