import * as cheerio from 'cheerio';
import type {
  Comic18Content,
  Comic18Detail,
  ComicReader,
  MainPage,
  PageItemType,
  PageTags,
  PaginationType,
} from '@ghs/share';
import type { AnyNode, CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import type { Cheerio } from 'cheerio/lib/cheerio';

import { helpElAttr, helpElText } from '../utils/cheerio-util';
import { sendMessage } from '../../utils/message';
import { search_history_list } from '../../controller';
const BASE_URL = `https://18comic.vip`;
const c18_getPagination = ($: CheerioAPI): PaginationType[] => {
  let $more: Cheerio<AnyNode> = $('div.hidden-xs ul.pagination > li');
  // 首页无分页
  const res: PaginationType[] = [];
  $more?.each((i, el) => {
    // li标签
    const $el = $(el);
    const $a = $el.find('a');
    const $span = $a.length > 0 ? $a.find('span') : $el.find('span');
    let title = $a.hasClass('prevnext')
      ? 'next'
      : $a.hasClass('prev')
      ? 'prev'
      : helpElText($a) || helpElText($span);
    title = title === '«' ? 'prev' : title;
    title = title.replace(/\n/g, '').trim();
    let url = helpElAttr($a, 'href');
    const isCurrent = $el.hasClass('active');
    res.push({ title, isCurrent, url });
  });
  return res;
};
const loadItem = (res: PageItemType[], $: CheerioAPI, $el: cheerio.Cheerio<cheerio.Element>) => {
  let $a = $el.find('div.thumb-overlay-albums a');
  if ($a.length === 0) {
    $a = $el.find('div.thumb-overlay a');
  }
  if ($a.length === 0) {
    return;
  }
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
  res.push({ title, coverImg, author, tags, flatTags, jumpUrl: `${BASE_URL}${jumpUrl}` });
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
  $('div.list-col div.well').each((i, el) => {
    const $el = $(el);
    loadItem(res, $, $el);
  });
  return res;
};
const c18_getTags = ($: CheerioAPI): PageTags[] => {
  const tags: PageTags[] = [
    { title: '总排行', url: `https://18comic.vip/albums?o=mv` },
    { title: '月排行', url: `https://18comic.vip/albums?t=m&o=mv` },
    { title: '周排行', url: `https://18comic.vip/albums?o=mv&t=w` },
    { title: '天排行', url: `https://18comic.vip/albums?o=mv&t=t` },
    { title: '全彩', url: `https://18comic.vip/search/photos?search_query=全彩` },
  ];
  const history = search_history_list('18Comic');
  ['全彩', '火影'].forEach((item) => {
    tags.push({ title: item, url: `https://18comic.vip/search/photos?search_query=${item}` });
  });
  history.forEach((item) => {
    tags.push({
      title: item.value,
      url: `https://18comic.vip/search/photos?search_query=${item.value}`,
    });
  });
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

export const c18_get_contents = (html: string): Comic18Detail => {
  const $: CheerioAPI = cheerio.load(html);
  const res: Comic18Content[] = [];
  const $detail = $('#intro-block div.p-t-5.p-b-5');
  $('#episode-block div.episode > ul.btn-toolbar > a').each((i, el) => {
    const $a = $(el);
    const $li = $a.find('li');
    const $time = $a.find('span.hidden-xs');
    const title = helpElText($li);
    res.push({
      title,
      time: helpElText($time),
      link: `${BASE_URL}${helpElAttr($a, ElementAttr.href)}`,
    });
  });
  if (res.length === 0) {
    const $link = $('#album_photo_cover a');
    res.push({
      title: '开始阅读',
      time: '--',
      link: `${BASE_URL}${helpElAttr($link, ElementAttr.href)}`,
    });
  }
  return { detail: helpElText($detail), contents: res };
};

export const c18_get_images = (html: string): ComicReader[] => {
  const $: CheerioAPI = cheerio.load(html);
  const html_sub = html.substring(
    html.indexOf('lang_delete_photo_ask'),
    html.indexOf('page_initial')
  );
  const infos = html_sub.split(';');
  const scramble_id$ = infos[1].split('=')[1].trim();
  const aid$ = infos[3].split('=')[1].trim();
  const res: ComicReader[] = [];
  $('div.panel-body > div.row.thumb-overlay-albums > div.center.scramble-page').each((i, el) => {
    const $el = $(el);
    const $img = $el.find(ElementTypes.img);
    res.push({
      imgUrl: helpElAttr($img, ElementAttr.dataOriginal),
      aid: aid$,
      scrambleId: scramble_id$,
    });
  });

  return res;
};
