import * as cheerio from 'cheerio';
import type { HWVideoInfo, MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import type { CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import { helpElAttr, helpElText } from '../utils/cheerio-util';
import { request_html_get } from '../../controller';

const r34_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more = $('#custom_list_videos_most_recent_videos_pagination .item');
  if ($more.length === 0) {
    return [];
  }
  const res: PaginationType[] = [];
  $more.each((i, el) => {
    // li标签
    const $el = $(el);
    if ($el.hasClass('jump_to')) {
      return;
    }
    const $a = $el.find('a');
    //
    const title = $el.hasClass('next') ? 'next' : helpElText($a);
    const url = helpElAttr($a, 'href');
    const isCurrent = $el.hasClass('active');
    res.push({ title, isCurrent, url });
  });
  return res;
};
const r34_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  $('#custom_list_videos_most_recent_videos .thumbs > div.item.thumb').each((i, el) => {
    const $el = $(el);
    const $a = $el.find('a.js-open-popup');
    const $img = $a.find(ElementTypes.img);
    const $title = $a.find('div.thumb_title');
    // tags
    const $quality = $a.find('div.quality');
    const $time = $a.find('div.time');
    const $added = $a.find('div.thumb_info div.added');
    const $views = $a.find('div.thumb_info div.views');

    const title = helpElText($title);
    const coverImg = helpElAttr($img, ElementAttr.dataWebp);
    const author = '';
    const jumpUrl = helpElAttr($a, ElementAttr.href);
    const tags = [];
    const flatTags: PageTags[] = [
      { title: helpElText($quality) },
      { title: helpElText($time) },
      { title: helpElText($added) },
      { title: helpElText($views) },
    ];
    res.push({ title, coverImg, author, tags, flatTags, jumpUrl });
  });
  return res;
};
const r34_getTags = ($: CheerioAPI): PageTags[] => {
  const res: PageTags[] = [];
  // $('#tags > li').each((i, el) => {
  //   const $el = $(el);
  //   const $a = $el.find('a');
  //   const $span = $el.find('span');
  //   const title = `${helpElText($a)} ${helpElText($span)}`;
  //   const url = `https:${helpElAttr($a, ElementAttr.href)}`;
  //   res.push({ title, url });
  // });
  return res;
};
/**
 * 获取首屏的信息
 * @param html
 */
export const r34_getPageInfo = (html: string): MainPage => {
  const $: CheerioAPI = cheerio.load(html);
  return {
    pagination: r34_getPagination($),
    items: r34_getItems($),
    tags: r34_getTags($),
  };
};
export const r34_getVideoInfo = async (url: string): Promise<HWVideoInfo> => {
  const html = await request_html_get(url);
  const $: CheerioAPI = cheerio.load(html);
  const $img = $('#image');
  const $video = $img.find('#video');
  const $source = $video.find(ElementTypes.source);
  const $span = $img.find(`span[itemprop="name"]`);
  return { url: helpElAttr($source, ElementAttr.src), title: helpElText($span) };
};
