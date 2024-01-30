import * as cheerio from 'cheerio';
import type {
  HWImgInfo,
  HWVideoInfo,
  MainPage,
  PageItemType,
  PageTags,
  PaginationType,
} from '@ghs/share';
import type { CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import { helpElAttr, helpElText } from '../utils/cheerio-util';
import { request_html_get } from '../../controller';

const bdn_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more = $('.pagination > ul > li');
  if ($more.length === 0) {
    return [];
  }
  const res: PaginationType[] = [];
  $more.each((i, el) => {
    // li标签
    const $el = $(el);
    const $a = $el.find('a');
    //
    let title = helpElText($a);
    title = title.replace(/\n/g, '');
    const url = `https://bad.news${helpElAttr($a, 'href')}`;
    const isCurrent = $a.hasClass('active');
    if (title === '下一页' && !res.some((i) => i.title === '下一页')) {
      res.push({ title, isCurrent, url });
      return;
    }
    if (title === '...' && !res.some((i) => i.title === '...')) {
      res.push({ title, isCurrent, url });
      return;
    }
    if (res.some((i) => i.url === url)) {
      return;
    }
    res.push({ title, isCurrent, url });
  });
  return res;
};
const bdn_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  $('div.content-left div.link.show ').each((i, el) => {
    const $el = $(el);
    const $title = $el.find('h3.title > a');
    const $video = $el.find('video');
    const author = '';
    const coverImg = helpElAttr($video, ElementAttr.poster);
    const jumpUrl = helpElAttr($video, ElementAttr.dataSource);
    const tags = [];
    const flatTags: PageTags[] = [{ title: helpElAttr($video, ElementAttr.dataType) }];
    res.push({ title: helpElText($title), coverImg, author, tags, flatTags, jumpUrl });
  });
  return res;
};

const bdn_getTags = ($: CheerioAPI): PageTags[] => {
  const res: PageTags[] = [];
  $('ul.list-inline a').each((i, el) => {
    const $a = $(el);
    const title = `${helpElText($a)}`;
    const url = `https://bad.news/${helpElAttr($a, ElementAttr.href)}`;
    res.push({ title, url });
  });
  return res;
};
/**
 * 获取首屏的信息
 * @param html
 */
export const bdn_getPageInfo = (html: string): MainPage => {
  const $: CheerioAPI = cheerio.load(html);
  return {
    pagination: bdn_getPagination($),
    items: bdn_getItems($),
    tags: bdn_getTags($),
  };
};
/**
 *
 * @param url
 */
export const bdn_getVideoInfo = async (url: string): Promise<HWVideoInfo> => {
  const html = await request_html_get(url);
  const $: CheerioAPI = cheerio.load(html);
  const $img = $('#image');
  const $video = $img.find('#video');
  const $source = $video.find(ElementTypes.source);
  const $span = $img.find(`span[itemprop="name"]`);
  return { url: helpElAttr($source, ElementAttr.src), title: helpElText($span) };
};
