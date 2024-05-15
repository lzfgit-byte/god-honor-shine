import * as cheerio from 'cheerio';
import type { MainPage, PHVideoInfo, PageItemType, PageTags, PaginationType } from '@ghs/share';
import type { CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import { getCurrentItems, helpElAttr, helpElText } from '../utils/cheerio-util';
import { request_html_get } from '../../controller';
import { request_string_get } from '../../http/use-get-blob-request';
let base_url = 'https://www.pornhub.com';
const ph_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more = $('.paginationGated li');
  if ($more.length === 0) {
    return [];
  }
  const res: PaginationType[] = [];
  $more.each((i, el) => {
    // li标签
    const $el = $(el);
    const $a = $el.find('a');
    const $span = $el.find('span');
    if ($a.hasClass('prev-page') || $a.hasClass('no-page')) {
      return;
    }
    //
    const prev = $el.hasClass('page_previous');
    const title = prev ? '<' : helpElText($a) || helpElText($span);
    const url = prev ? '' : helpElAttr($a, ElementAttr.href);
    const isCurrent = $el.hasClass('page_current');

    res.push({ title, isCurrent, url: url.length > 0 ? `${base_url}${url}` : '' });
  });

  return res;
};
const ph_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  let items = getCurrentItems(
    () => $(`#singleFeedSection .pcVideoListItem`),
    () => $(`#videoSearchResult .pcVideoListItem`),
    () => $(`#videoCategory .pcVideoListItem`)
  );
  items.each((i, el) => {
    const $el = $(el);
    const $a = $el.find('.phimage a');
    const $img = $a.find('img');

    const title = helpElAttr($a, ElementAttr.title);
    const coverImg = helpElAttr($img, ElementAttr.src) || helpElAttr($img, ElementAttr.dataSrc);
    let author = '';
    const jumpUrl = helpElAttr($a, ElementAttr.href);

    const $info = $el.find('.thumbnail-info-wrapper');
    const $author = $info.find('.usernameWrap a');
    let $views = getCurrentItems(
      () => $info.find('.videoDetailBlock .views > var'),
      () => $info.find('.videoDetailsBlock  .views > var')
    );
    let $add = getCurrentItems(
      () => $info.find('.videoDetailBlock  .added'),
      () => $el.find('.videoDetailsBlock  .added')
    );
    const $rating = getCurrentItems(
      () => $info.find('.videoDetailBlock > .rating-container > .value'),
      () => $info.find('.videoDetailsBlock > .rating-container > .value')
    );
    const $duration = $el.find('.duration');

    author = helpElText($author);

    const tags = [];
    const flatTags: PageTags[] = [
      { title: helpElText($views) },
      { title: helpElText($add) },
      { title: helpElText($rating) },
      { title: helpElText($duration) },
    ];
    res.push({
      title,
      coverImg,
      author,
      tags,
      flatTags,
      jumpUrl: `${base_url}${jumpUrl}`,
    });
  });
  return res;
};
const ph_getTags = ($: CheerioAPI): PageTags[] => {
  const res: PageTags[] = [];
  $('#main-cats-sub-list > li').each((i, el) => {
    const $el = $(el);
    const $a = $el.find('a');
    const title = `${helpElText($a)}`;
    const href = helpElAttr($a, ElementAttr.href);
    if (href === '/tags') {
      return;
    }
    const url = `${base_url}${href}`;
    res.push({ title, url });
  });
  return res;
};
/**
 * 获取首屏的信息
 * @param html
 */
export const ph_getPageInfo = (html: string): MainPage => {
  const $: CheerioAPI = cheerio.load(html);
  return {
    pagination: ph_getPagination($),
    items: ph_getItems($),
    tags: ph_getTags($),
  };
};
export const ph_getVideoInfo = async (url: string): Promise<PHVideoInfo> => {
  let html = await request_html_get(url);
  const $: CheerioAPI = cheerio.load(html);
  const $title = $('#main .page-title');
  let htmls = html.split('\n');
  if (htmls.length === 0) {
    htmls = html.split('\r');
  }
  let urlRes = '';
  htmls.forEach((item: string) => {
    if (item.includes('html5player.setVideoHLS')) {
      urlRes = item.substring(item.indexOf('(') + 2, item.indexOf(')') - 1);
    }
  });
  const m3u8s: string = await request_string_get(urlRes);
  const baseM3u8 = urlRes.replace('hls.m3u8', '');
  const urls = [];
  m3u8s.split('\n').forEach((item) => {
    if (item.includes('.m3u8')) {
      const spilts = item.split('-');
      urls.push({ hd: spilts[1], url: `${baseM3u8}${item}` });
    }
  });
  return { urls, title: helpElText($title) };
};