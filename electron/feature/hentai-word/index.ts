import * as cheerio from 'cheerio';
import type { MainPage, PaginationType } from '@ghs/share';
import type { CheerioAPI } from 'cheerio';
import type { PageItemType } from '@ghs/share/src';
import { helpElAttr, helpElText } from '../utils/cheerio-util';

const hw_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more = $('#more-hentai li');
  if ($more.length === 0) {
    return [];
  }
  const res: PaginationType[] = [];
  $more.each((i, el) => {
    // li标签
    const $el = $(el);
    const $span = $el.find('span');
    const $a = $el.find('a');
    //
    const title = helpElText($span) || helpElText($a);
    const url = helpElAttr($a, 'href');
    const isCurrent = $span.hasClass('current');
    res.push({ title, isCurrent, url });
  });
  return res;
};
const hw_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  return res;
};
const hw_getTags = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  return res;
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
