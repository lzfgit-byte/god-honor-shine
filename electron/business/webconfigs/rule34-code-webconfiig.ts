import type { WebConfig } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { hashString } from '@ilzf/utils';
import { getHtml } from '../../export';
import { LogMsgUtil, NotifyMsgUtil } from '../../utils/message';
import { eventEmitter } from '../../utils/KitUtil';

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
  key: 'rule34',
  name: 'r34',
  favicon: 'https://rule34video.com/favicon.ico',
  homeUrl: 'https://rule34video.com',
  searchUrl: 'https://rule34video.com/search/',
  imgWidth: '270px',
  imgHeight: '150px',

  drawWidth: '780px',
  historyRemember: 100,

  setTags: ['收藏', '历史', '过滤选项', '系统配置', '日志'],

  getUrlReplace($) {
    return [];
  },
  getItems($) {
    const res = [];
    const ids = [
      '#custom_list_videos_most_recent_videos',
      '#custom_list_videos_latest_videos_list',
      '#custom_list_videos_videos_list_search',
    ];
    let list = null;
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
      const jumpUrl = helpElAttr($a, ElementAttr.href);
      const flatTags = [
        { title: helpElText($quality) },
        { title: helpElText($time) },
        { title: helpElText($added) },
        { title: helpElText($views) },
      ];
      res.push({
        jumpUrl,
        title,
        coverImg,
        type: 'video',
        renderType: 'normal',
        tags: flatTags.filter((item) => item.title),
      });
    });

    return res;
  },

  getPagination($) {
    const res = [];
    const ids = [
      '#custom_list_videos_most_recent_videos_pagination',
      '#custom_list_videos_latest_videos_list_pagination',
      '#custom_list_videos_videos_list_search_pagination',
    ];
    let $more = null;
    ids.forEach((item) => {
      if ($more === null || $more?.length === 0) {
        $more = $(`${item} .item`);
      }
    });
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
    return [];
  },
  async getDetailInfo(item, cheerio) {
    const key = hashString(item.jumpUrl);
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
    NotifyMsgUtil.sendNotifyMsg('进度', `开始获取html`, key);
    const handle = (msg) => {
      NotifyMsgUtil.sendNotifyMsg('进度', `开始获取html:${msg}`, key);
    };
    eventEmitter.on(key, handle);
    let html = await getHtml(item.jumpUrl);
    eventEmitter.off(key, handle);
    NotifyMsgUtil.sendNotifyMsg('进度', `开始获取html:success`, key);
    const $ = cheerio.load(html);
    if (item.type === 'video') {
      const $img = $('#image');
      const $video = $img.find('#video');
      const $source = $video.find(ElementTypes.source);
      const $span = $img.find(`span[itemprop="name"]`);
      NotifyMsgUtil.close(key);
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
        NotifyMsgUtil.close(key);
        return {
          detailType: 'image',
          renderType: 'normal',
          details: [
            { type: 'image', url: hwInfo.minUrl, fullUrl: hwInfo.fullUrl, title: hwInfo.title },
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
        NotifyMsgUtil.sendNotifyMsg('进度', `${i + 1}/${urls.length}`, key);

        const url_ = urls[i];
        const keyFoo = hashString(url_);

        const handle = (msg) => {
          NotifyMsgUtil.sendNotifyMsg('进度', `${i + 1}/${urls.length},html:${msg}`, key);
        };
        eventEmitter.on(keyFoo, handle);
        const html = await getHtml(url_);
        eventEmitter.off(keyFoo, handle);

        const $ = cheerio.load(html);
        const hwInfo = getHWImgInfo($);
        res.push({
          type: 'image',
          url: hwInfo.minUrl,
          fullUrl: hwInfo.fullUrl,
          title: hwInfo.title,
        });
      }
      NotifyMsgUtil.close(key);
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

(
  () =>
  (
    helpElAttr,
    helpElText,
    ElementAttr,
    ElementTypes,
    getHtml,
    NotifyMsgUtil,
    LogMsgUtil,
    hashString,
    eventEmitter
  ) => {
    return '$code';
  }
)();
