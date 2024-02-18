import * as cheerio from 'cheerio';
import type { HWVideoInfo, MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import type { AnyNode, CheerioAPI } from 'cheerio';

import { ElementAttr, ElementTypes } from '@ghs/share';

import type { Cheerio } from 'cheerio/lib/cheerio';
import { helpElAttr, helpElText } from '../utils/cheerio-util';
import { request_html_get } from '../../controller';

const r34_getPagination = ($: CheerioAPI): PaginationType[] => {
  const ids = [
    '#custom_list_videos_most_recent_videos_pagination',
    '#custom_list_videos_latest_videos_list_pagination',
    '#custom_list_videos_videos_list_search_pagination',
  ];
  let $more: Cheerio<AnyNode> = null;
  ids.forEach((item) => {
    if ($more === null || $more?.length === 0) {
      $more = $(`${item} .item`);
    }
  });
  const res: PaginationType[] = [];
  $more.each((i, el) => {
    // li标签
    const $el = $(el);
    if ($el.hasClass('jump_to')) {
      return;
    }
    const $a = $el.find('a');
    //
    let title = $el.hasClass('next') ? 'next' : $el.hasClass('prev') ? 'prev' : helpElText($a);
    title = title.replace(/\n/g, '').trim();
    let url = helpElAttr($a, 'href');
    if (url === '#search') {
      const dataParameters = helpElAttr($a, 'data-parameters');
      const arr1 = dataParameters.split(';');
      let qStr = 'mode:async&function:get_block&block_id:custom_list_videos_videos_list_search';
      let qValue = '';
      arr1.forEach((item) => {
        const arr2 = item.split(':');
        if (arr2.length === 2) {
          const [key, value] = arr2;
          const arr3 = key.split('+');
          if (arr3.length > 0) {
            arr3.forEach((tm) => {
              qStr += `${tm}=${value}&`;
            });
          } else {
            qStr += `${key}=${value}&`;
          }

          if (key === 'q') {
            qValue = value;
          }
        }
      });
      url = `https://rule34video.com/search/${qValue}/?${qStr.substring(0, qStr.length - 1)}`;
    }
    if (!url.startsWith('https://rule34video.com')) {
      url = `https://rule34video.com${url}`;
    }
    const isCurrent = $el.hasClass('active');
    res.push({ title, isCurrent, url });
  });
  return res;
};
const r34_getItems = ($: CheerioAPI): PageItemType[] => {
  const res: PageItemType[] = [];
  const ids = [
    '#custom_list_videos_most_recent_videos',
    '#custom_list_videos_latest_videos_list',
    '#custom_list_videos_videos_list_search',
  ];
  let list: Cheerio<AnyNode> = null;
  ids.forEach((item) => {
    if (list === null || list?.length === 0) {
      list = $(`${item} .thumbs > div.item.thumb`);
    }
  });
  list.each((i, el) => {
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
  return [
    { title: 'Most Relevant', url: '' },
    { title: 'Latest', url: 'sort_by;post_date' },
    { title: 'Most Viewed', url: 'sort_by;video_viewed' },
    { title: 'Top Rated', url: 'sort_by;rating' },
  ];
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
