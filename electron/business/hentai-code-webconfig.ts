import type { WebConfig } from '@ghs/types';
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
  searchUrl: 'https://thehentaiworld.com/?s=',
  searchKey: '$key',
  imgWidth: '220px',
  imgHeight: '147px',

  getUrlReplace($) {
    return [];
  },
  getItems($) {
    const res = [];
    $('#thumbContainer .thumb').each((i, el) => {
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
      res.push({
        jumpUrl,
        title,
        coverImg,
        type: isVideo ? 'video' : 'image',
        renderType: 'normal',
        tags: flatTags.filter((item) => item.title),
      });
    });

    return res;
  },

  getPagination($) {
    const res = [];
    $('#more-hentai li').each((i, el) => {
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
  },
  getTags($) {
    const res = [];
    $('#tags > li').each((i, el) => {
      const $el = $(el);
      const $a = $el.find('a');
      const $span = $el.find('span');
      const title = `${helpElText($a)} ${helpElText($span)}`;
      const url = `https:${helpElAttr($a, ElementAttr.href)}`;
      res.push({ title, url });
    });
    return res;
  },
  getDetailInfo(item, chee) {
    console.log('getDetailInfo');
    return null;
  },
  adapterLoadUrl(url) {
    return url;
  },
  adapterSearchUrl(key) {
    key = key.replace(' ', '+');
    return this.searchUrl + key;
  },
};
/* break */

(() => (helpElAttr, helpElText, ElementAttr, ElementTypes) => {
  return '$code';
})();
