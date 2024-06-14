import type { WebConfig } from '@ghs/types';
import { hashString } from '@ilzf/utils';
import { ElementAttr, ElementTypes } from '@ghs/constant';
import { getHtml } from '../../export';
import { LogMsgUtil, NotifyMsgUtil } from '../../utils/message';
import { eventEmitter, helpElAttr, helpElText } from '../../utils/KitUtil';

const getData = (): WebConfig => /* break */ ({
  key: 'hw',
  name: 'HW',
  favicon: 'https://thehentaiworld.com/favicon.ico',
  homeUrl: 'https://thehentaiworld.com/?new',
  searchUrl: 'https://thehentaiworld.com/?s=',
  imgWidth: '220px',
  imgHeight: '147px',

  drawWidth: '780px',
  historyRemember: 100,

  setTags: ['标签', '收藏', '历史', '系统配置', '日志'],

  currentUrlReplace: null,

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
});
