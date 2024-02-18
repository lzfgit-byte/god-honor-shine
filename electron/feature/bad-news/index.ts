import * as cheerio from 'cheerio';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import type { CheerioAPI } from 'cheerio';

import { ElementAttr } from '@ghs/share';

import type { BadNewVideoInfo } from '@ghs/share/src';
import { BadNewVideoType } from '@ghs/share/src';
import { helpElAttr, helpElText } from '../utils/cheerio-util';
import { request_html_get } from '../../controller';
const base_url = 'https://bad.news';
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
    const url = `${base_url}${helpElAttr($a, 'href')}`;
    const isCurrent = $a.hasClass('active');
    if (title === '下一页' && !res.some((i) => i.title === '下一页')) {
      res.push({ title, isCurrent, url });
      return;
    }
    if (title === '...' && !res.some((i) => i.title === '...')) {
      res.push({ title, isCurrent, url });
      return;
    }
    if (res.some((i) => i.url === url) && res.some((i) => i.title === title)) {
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
    if (res.some((i) => i.jumpUrl === jumpUrl)) {
      return;
    }
    const tags = [];
    const flatTags: PageTags[] = [{ title: helpElAttr($video, ElementAttr.dataType) }];
    res.push({ title: helpElText($title), coverImg, author, tags, flatTags, jumpUrl });
  });
  $('div.content div.spacer div.link.col-md-4').each((i, el) => {
    const $el = $(el);
    const $a = $el.find('h3.title > a:eq(0)');
    const $img = $el.find('div.coverimg img');
    const $time = $el.find('div.coverimg div.ct-time span');
    const author = '';
    const coverImg = helpElAttr($img, ElementAttr.dataEcho);
    const jumpUrl = base_url + helpElAttr($a, ElementAttr.href);
    if (res.some((i) => i.jumpUrl === jumpUrl)) {
      return;
    }
    const tags = [];
    const flatTags: PageTags[] = [{ title: helpElText($time) }, { title: BadNewVideoType.av }];
    res.push({ title: helpElText($a), coverImg, author, tags, flatTags, jumpUrl });
  });
  $('div.stui-vodlist article').each((i, el) => {
    const $el = $(el);
    const $a = $el.find('div.thumbr > a');
    const $img = $el.find('div.thumbr img');
    const author = '';
    const coverImg = helpElAttr($img, ElementAttr.dataEcho);
    const jumpUrl = base_url + helpElAttr($a, ElementAttr.href);
    if (res.some((i) => i.jumpUrl === jumpUrl)) {
      return;
    }
    const tags = [];
    const flatTags: PageTags[] = [{ title: BadNewVideoType.dm }];
    res.push({
      title: helpElAttr($img, ElementAttr.alt),
      coverImg,
      author,
      tags,
      flatTags,
      jumpUrl,
    });
  });
  return res;
};

const bdn_getTags = ($: CheerioAPI): PageTags[] => {
  const res: PageTags[] = [
    { title: '短视频', url: 'https://bad.news/tag/porn' },
    { title: '长视频', url: 'https://bad.news/tag/long-porn' },
    { title: '日本AV', url: 'https://bad.news/av' },
    { title: '动漫', url: 'https://bad.news/dm' },
  ];
  $('div.input-group ul.list-inline a').each((i, el) => {
    const $a = $(el);
    const title = `${helpElText($a)}`;
    if (title.includes('更多')) {
      return;
    }
    const url = `${base_url}${helpElAttr($a, ElementAttr.href)}`;
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
export const bdn_getVideoInfo = async (url: string): Promise<BadNewVideoInfo> => {
  const html = await request_html_get(url);
  const $: CheerioAPI = cheerio.load(html);
  const $video = $('video');
  const jumpUrl = helpElAttr($video, ElementAttr.dataSource);
  let type: any = helpElAttr($video, ElementAttr.dataType);
  if (type === '') {
    type = jumpUrl.includes('m3u8') ? 'm3u8' : 'mp4';
  }
  return { url: jumpUrl, type };
};
