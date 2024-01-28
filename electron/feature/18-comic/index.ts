import * as cheerio from 'cheerio';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import type { AnyNode, CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import type { Cheerio } from 'cheerio/lib/cheerio';
import { helpElAttr, helpElText } from '../utils/cheerio-util';

const c18_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more: Cheerio<AnyNode>;
  // 首页无分页
  const res: PaginationType[] = [];
  $more?.each((i, el) => {
    // li标签
    const $el = $(el);
    const $a = $el.find('a');
    let title = $el.hasClass('next') ? 'next' : $el.hasClass('prev') ? 'prev' : helpElText($a);
    title = title.replace(/\n/g, '').trim();
    let url = helpElAttr($a, 'href');
    const isCurrent = $el.hasClass('active');
    res.push({ title, isCurrent, url });
  });
  return res;
};
const loadItem = (res: PageItemType[], $: CheerioAPI, $el: cheerio.Cheerio<cheerio.Element>) => {
  const $a = $el.find('div.thumb-overlay-albums a');
  const $img = $a.find(ElementTypes.img);
  // author
  const $author = $el.find('div.title-truncate-index.hidden-xs > a');
  // tags
  const $love = $el.find('div.label-loveicon a span');
  const $category = $el.find('div.category-icon div');
  const $tags = $el.find('div.title-truncate.tags > a');

  const title = helpElAttr($img, ElementAttr.title);
  const coverImg =
    helpElAttr($img, ElementAttr.dataSrc) || helpElAttr($img, ElementAttr.dataOriginal);
  let author = '';
  $author.each((i, el) => {
    author += `${helpElText($(el))},`;
  });
  const jumpUrl = helpElAttr($a, ElementAttr.href);
  if (jumpUrl === '') {
    return;
  }
  const tags: PageTags[] = [];
  $tags.each((i, el) => {
    const $el = $(el);
    tags.push({
      title: helpElText($el),
      url: `https://18comic.vip/${helpElAttr($el, ElementAttr.href)}`,
    });
  });
  const flatTags: PageTags[] = [{ title: `${helpElText($love)}心` }];
  $category.each((i, el) => {
    flatTags.push({ title: helpElText($(el)) });
  });
  res.push({ title, coverImg, author, tags, flatTags, jumpUrl });
};
const c18_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  $('ul.owl-carousel.owl-comic-block div.well').each((i, el) => {
    const $el = $(el);
    loadItem(res, $, $el);
  });
  $('ul.owl-carousel.owl-comic-block-1 div.well').each((i, el) => {
    const $el = $(el);
    loadItem(res, $, $el);
  });
  $('div.row > div.col-sm-12 > div.row.m-0 div.well').each((i, el) => {
    const $el = $(el);
    loadItem(res, $, $el);
  });
  return res;
};
const c18_getTags = ($: CheerioAPI): PageTags[] => {
  const tags: PageTags[] = [];
  return tags;
};
/**
 * 获取首屏的信息
 * @param html
 */
export const c18_getPageInfo = (html: string): MainPage => {
  const $: CheerioAPI = cheerio.load(html);
  return {
    pagination: c18_getPagination($),
    items: c18_getItems($),
    tags: c18_getTags($),
  };
};
