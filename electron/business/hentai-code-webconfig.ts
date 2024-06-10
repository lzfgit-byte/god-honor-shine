import type { WebConfig } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { getHtml } from '../export';

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
  async getDetailInfo(item, cheerio) {
    const getHWImgInfo = ($) => {
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
    let html = await getHtml(item.jumpUrl);
    const $ = cheerio.load(html);
    if (item.type === 'video') {
      const $img = $('#image');
      const $video = $img.find('#video');
      const $source = $video.find(ElementTypes.source);
      const $span = $img.find(`span[itemprop="name"]`);
      return {
        detailType: 'mp4',
        renderType: 'normal',
        details: [
          { type: 'mp4', url: helpElAttr($source, ElementAttr.src), title: helpElText($span) },
        ],
        relations: [],
      };
    }
    if (item.type === 'image') {
      const thumbs = $('#miniThumbContainer .minithumb');
      if (thumbs.length === 0) {
        const hwInfo = getHWImgInfo($);
        return {
          detailType: 'image',
          renderType: 'normal',
          details: [
            { type: 'image', url: hwInfo.minUrl, fullUr: hwInfo.fullUrl, title: hwInfo.title },
          ],
          relations: [],
        };
      }
      const urls = [];
      thumbs.each((i, el) => {
        urls.push(helpElAttr($(el).find(ElementTypes.a), ElementAttr.href));
      });
      const res = [];
      for (let i = 0; i < urls.length; i++) {
        const url_ = urls[i];
        const html = await getHtml(url_);
        const $ = cheerio.load(html);
        const hwInfo = getHWImgInfo($);
        res.push({
          type: 'image',
          url: hwInfo.minUrl,
          fullUr: hwInfo.fullUrl,
          title: hwInfo.title,
        });
      }
      return { detailType: 'image', renderType: 'normal', details: res, relations: [] };
    }
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

(() => (helpElAttr, helpElText, ElementAttr, ElementTypes, getHtml) => {
  return '$code';
})();
