import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import type { DetailInfo, Item, Pagination } from '@ghs/types';
import { NormalFunc } from './common-func';

export abstract class AdapterFunc extends NormalFunc {
  abstract getCurrentItems(): Cheerio<Element>;
  abstract getItemByEl(el: Element): Item;

  abstract getCurrentPagination(): Cheerio<Element>;
  abstract getPaginationByEl(el: Element): Pagination;

  abstract getCurrentTags(): Cheerio<Element>;
  abstract getTagByEl(el: Element): Pagination;

  abstract getDetailInfo(item: Item): DetailInfo;
}
