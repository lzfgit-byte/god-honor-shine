import * as cheerio from 'cheerio';
import type { MainPage, PaginationType } from '@ghs/share';
import type { CheerioAPI } from 'cheerio';

const hw_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more = $('#more-hentai li');
  if ($more.length === 0) {
    return [];
  }
  const res = [];
  $more.each((i, el) => {});
  return res;
};
const hw_getItems = ($: CheerioAPI) => {
  return [];
};
const hw_getTags = ($: CheerioAPI) => {
  return [];
};
/**
 * 获取首屏的信息
 * @param html
 */
export const hw_getPageInfo = (html: string): MainPage => {
  const $: CheerioAPI = cheerio.load(html);
  return {
    pagination: hw_getPagination($),
    items: hw_getItems($),
    tags: hw_getTags($),
  };
};
