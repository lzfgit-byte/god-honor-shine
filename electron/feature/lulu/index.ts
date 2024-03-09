import * as cheerio from 'cheerio';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import type { AnyNode, CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import type { Cheerio } from 'cheerio/lib/cheerio';
import { helpElAttr, helpElText } from '../utils/cheerio-util';

const lulu_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more: Cheerio<AnyNode> = $('#w0 > .pagination > li');
  const res: PaginationType[] = [];
  $more.each((i, el) => {
    // li标签
    const $el = $(el);
    const $a = $el.find('a');
    const disable = $a.hasClass('disabled');
    let title = helpElText($a);
    let url = helpElAttr($a, 'href');
    if (url && !url.startsWith('https://www.pornlulu.com')) {
      url = `https://www.pornlulu.com${url}`;
    }
    if (disable) {
      url = '';
    }
    const isCurrent = $el.hasClass('active');
    title = $el.hasClass('prev') ? '<<' : $el.hasClass('next') ? '>>' : title;
    res.push({ title, isCurrent, url });
  });
  return res;
};
const lulu_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  let list: Cheerio<AnyNode> = $('#videos > div');
  list.each((i, el) => {
    const $el = $(el);
    const $a = $el.find('a.visited');
    const $img = $a.find(ElementTypes.img);

    const title = helpElAttr($img, ElementAttr.alt);
    const coverImg = helpElAttr($img, ElementAttr.dataSrc);
    const author = '';
    const jumpUrl = helpElAttr($a, ElementAttr.href);
    const tags = [];
    const flatTags: PageTags[] = [];
    res.push({ title, coverImg, author, tags, flatTags, jumpUrl });
  });
  return res;
};
const lulu_getTags = ($: CheerioAPI): PageTags[] => {
  const pageTags: PageTags[] = [];
  $('#w4 > li').each((i, el) => {
    const $el = $(el);
    const $a = $el.find(ElementTypes.a);
    const $p = $el.find(ElementTypes.p);
    pageTags.push({
      title: helpElText($p),
      url: `https://www.pornlulu.com${helpElAttr($a, ElementAttr.href)}`,
    });
  });
  return pageTags;
};
/**
 * 获取首屏的信息
 * @param html
 */
export const lulu_getPageInfo = (html: string): MainPage => {
  const $: CheerioAPI = cheerio.load(html);
  return {
    pagination: lulu_getPagination($),
    items: lulu_getItems($),
    tags: lulu_getTags($),
  };
};
