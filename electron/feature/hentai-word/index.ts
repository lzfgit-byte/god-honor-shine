import { it } from 'node:test';
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
import { processMessage } from '../../utils/message';

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
    const $span = $a.find('span');
    const title = helpElAttr($a, ElementAttr.title);
    const coverImg = helpElAttr($img, ElementAttr.src);
    const author = '';
    const jumpUrl = helpElAttr($a, ElementAttr.href);
    const tags = [];
    const flatTags: PageTags[] = [{ title: helpElText($h4) }, { title: helpElText($span) }];
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
export const hw_getVideoInfo = async (url: string): Promise<HWVideoInfo> => {
  const html = await request_html_get(url);
  const $: CheerioAPI = cheerio.load(html);
  const $img = $('#image');
  const $video = $img.find('#video');
  const $source = $video.find(ElementTypes.source);
  const $span = $img.find(`span[itemprop="name"]`);
  return { url: helpElAttr($source, ElementAttr.src), title: helpElText($span) };
};
const getHWImgInfo = ($: CheerioAPI): HWImgInfo => {
  const $grid = $('#grid');
  const $h1 = $grid.find(ElementTypes.h1);
  const $minImg = $grid.find('#image img');
  const $minImg2 = $grid.find('#doujin img');
  const $fullA = $('#info a');
  const fullUrl = helpElAttr($fullA, ElementAttr.href);
  const minUrl = helpElAttr($minImg, ElementAttr.src) || helpElAttr($minImg2, ElementAttr.src);
  const title = helpElText($h1);
  return { fullUrl, minUrl, title };
};
export const hw_getImgInfo = async (url: string): Promise<HWImgInfo[]> => {
  const html = await request_html_get(url);
  const $: CheerioAPI = cheerio.load(html);
  const thumbs = $('#miniThumbContainer .minithumb');
  const res: HWImgInfo[] = [];
  if (thumbs.length === 0) {
    res.push(getHWImgInfo($));
    return res;
  }
  const urls: string[] = [];
  thumbs.each((i, el) => {
    urls.push(helpElAttr($(el).find(ElementTypes.a), ElementAttr.href));
  });
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    processMessage('获取图片中', i, url.length);
    const html = await request_html_get(url);
    const $: CheerioAPI = cheerio.load(html);
    res.push(getHWImgInfo($));
  }
  return res;
};
