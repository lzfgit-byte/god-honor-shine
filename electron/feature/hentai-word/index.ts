import * as cheerio from 'cheerio';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import type { CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

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
  $('#thumbContainer .thumb').each((i, el) => {
    const $el = $(el);
    const $a = $el.find(ElementTypes.a);
    const $h4 = $a.find(ElementTypes.h4);
    const $img = $a.find(ElementTypes.img);
    const title = helpElAttr($a, ElementAttr.title);
    const coverImg = helpElAttr($img, ElementAttr.src);
    const author = '';
    const jumpUrl = helpElAttr($a, ElementAttr.href);
    const tags = [];
    const flatTags: PageTags[] = [{ title: helpElText($h4) }];
    res.push({ title, coverImg, author, tags, flatTags, jumpUrl });
  });
  return res;
};
const hw_getTags = ($: CheerioAPI): PageTags[] => {
  const res: PageTags[] = [];
  $('#tags > li').each((i, el) => {
    const $el = $(el);
    const $a = $el.find('a');
    const $span = $el.find('span');
    const title = `${helpElText($a)} ${helpElText($span)}`;
    const url = `https:${helpElAttr($a, ElementAttr.href)}`;
    res.push({ title, url });
  });
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
