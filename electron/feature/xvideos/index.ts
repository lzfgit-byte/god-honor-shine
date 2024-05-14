import * as cheerio from 'cheerio';
import type { MainPage, PageItemType, PageTags, PaginationType, XVVideoInfo } from '@ghs/share';
import type { CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import { helpElAttr, helpElText } from '../utils/cheerio-util';
import { request_html_get } from '../../controller';
import { processMessage } from '../../utils/message';

const xv_getPagination = ($: CheerioAPI): PaginationType[] => {
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
const xv_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  $(`#content > div > div:not(.clearfix)`).each((i, el) => {
    const $ele = $(el);
    const $el = $ele.find('.thumb-inside .thumb');
    const $a = $el.find(ElementTypes.a);
    const $img = $a.find(ElementTypes.img);
    const $HDSpan = $el.find('.video-hd-mark');

    const $title = $ele.find('.thumb-under .title > a');
    const $meta = $ele.find('.thumb-under .metadata');
    const $duration = $meta.find('.duration');
    const $nums = $meta.find('.bg > span:eq(1)');
    const txt = helpElText($nums);
    let sps: any = txt.split('-');
    sps = sps[1]?.replace('观看次数', '');

    const title = helpElAttr($title, ElementAttr.title);
    const coverImg = helpElAttr($img, ElementAttr.dataSrc) || helpElAttr($img, ElementAttr.src);
    const author = '';
    const jumpUrl = helpElAttr($a, ElementAttr.href);
    const tags = [];
    const flatTags: PageTags[] = [{ title: helpElText($HDSpan) }, { title: helpElText($duration) }];
    if (sps) {
      flatTags.push({ title: sps });
    }
    res.push({ title, coverImg, author, tags, flatTags, jumpUrl });
  });
  return res;
};
const xv_getTags = ($: CheerioAPI): PageTags[] => {
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
export const xv_getPageInfo = (html: string): MainPage => {
  const $: CheerioAPI = cheerio.load(html);
  return {
    pagination: xv_getPagination($),
    items: xv_getItems($),
    tags: xv_getTags($),
  };
};
export const xv_getVideoInfo = async (url: string): Promise<XVVideoInfo> => {
  let html = await request_html_get(url);
  const $: CheerioAPI = cheerio.load(html);
  const $img = $('#image');
  const $video = $img.find('#video');
  const $source = $video.find(ElementTypes.source);
  const $span = $img.find(`span[itemprop="name"]`);
  return { url: helpElAttr($source, ElementAttr.src), title: helpElText($span) };
};
