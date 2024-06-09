import type { Item, WebConfig } from '@ghs/types';
import { ItemType } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';

function helpElAttr($el: Cheerio<Element>, attr: string): string {
  return $el?.attr(attr) || '';
}

function helpElText($el: Cheerio<Element>): string {
  return $el?.text() || '';
}
const ElementAttr = {
  src: 'src',
  title: 'title',
  href: 'href',
  class: 'class',
  dataWebp: 'data-webp',
  dataSrc: 'data-src',
  dataOriginal: 'data-original',
  poster: 'poster',
  dataSource: 'data-source',
  dataType: 'data-type',
  dataEcho: 'data-echo',
  dataError: 'data-error',
  alt: 'alt',
};
const ElementTypes = {
  a: 'a',
  img: 'img',
  h4: 'h4',
  h1: 'h1',
  video: 'video',
  source: 'source',
  p: 'p',
};
const webConfig: WebConfig = /* break */ {
  key: 'hw',
  name: 'HW',
  favicon: 'https://thehentaiworld.com/favicon.ico',
  homeUrl: 'https://thehentaiworld.com/?new',
  searchUrl: 'https://thehentaiworld.com/?s=$key',

  getUrlReplace($) {
    console.log('getUrlReplace');
    return [];
  },
  getCurrentItems($) {
    return $('#thumbContainer .thumb');
  },
  getItemByEl(el, $) {
    const $el = $(el);
    const $a = $el.find(ElementTypes.a);
    const $h4 = $a.find(ElementTypes.h4);
    const $img = $a.find(ElementTypes.img);
    const $span = $a.find('span');
    const title = helpElAttr($a, ElementAttr.title);
    const coverImg = helpElAttr($img, ElementAttr.src);
    const jumpUrl = helpElAttr($a, ElementAttr.href);
    const flatTags = [{ title: helpElText($h4) }, { title: helpElText($span) }];
    const isVideo = flatTags.some((item) => item.title.toUpperCase() === 'VIDEO');
    return {
      jumpUrl,
      title,
      coverImg,
      type: isVideo ? 'video' : 'image',
      renderType: 'normal',
      tags: flatTags.filter((item) => item.title),
    };
  },
  getCurrentPagination($) {
    console.log('getCurrentPagination');
    return null;
  },
  getPaginationByEl(el, $) {
    console.log('getPaginationByEl');
    return null;
  },
  getCurrentTags($) {
    console.log('getCurrentTags');
    return null;
  },
  getTagByEl(el, $) {
    console.log('getTagByEl');
    return null;
  },
  getDetailInfo(item, chee) {
    console.log('getDetailInfo');
    return null;
  },
};
/* break */

(() => (helpElAttr, helpElText, ElementAttr, ElementTypes) => {
  return '$code';
})();
