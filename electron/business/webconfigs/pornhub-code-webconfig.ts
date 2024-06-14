import type { Item, UrlReplace, WebConfig } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { hashString } from '@ilzf/utils';

import { ElementAttr, ElementTypes } from '@ghs/constant';
import { getHtml } from '../../export';
import { LogMsgUtil, MessageUtil, NotifyMsgUtil } from '../../utils/message';
import { eventEmitter, getCurrentItems, helpElAttr, helpElText } from '../../utils/KitUtil';
import { request_string_get } from '../../http';

const getData = (): WebConfig => /* break */ ({
  key: 'xVideo',
  name: 'XV',
  favicon: 'https://www.pornhub.com/favicon.ico',
  homeUrl: 'https://www.pornhub.com',
  searchUrl: 'https://www.pornhub.com',
  imgWidth: '225px',
  imgHeight: '133px',

  drawWidth: `${3.5 * 225}px`,
  historyRemember: 100,

  setTags: ['标签', '收藏', '历史', '过滤选项', '系统配置', '日志'],

  currentUrlReplace: [
    {
      schema: 'sort',
      urlAppend: [{ value: '', param: 'o', title: '最相关', current: true }],
    },
    {
      schema: 'max_duration',
      urlAppend: [{ value: '', param: 'max_duration', title: '不限', current: true }],
    },
    {
      schema: 'quality',
      urlAppend: [{ value: '', param: 'hd', title: '不限', current: true }],
    },
    {
      schema: 'produce',
      urlAppend: [{ value: '', param: 'p', title: '全部', current: true }],
    },
  ],

  getUrlReplace($) {
    const judgeCurrent = (schema, title) => {
      return (
        this.currentUrlReplace.filter((item) => item.schema === schema)[0].urlAppend[0].title ===
        title
      );
    };
    const sorts = [
      { value: '', name: '最相关' },
      { value: 'mv', name: '最多观看' },
      { value: 'tr', name: '最高分' },
      { value: 'lg', name: '最长' },
      { value: 'mr', name: '最新' },
    ];
    const videoLength = [
      { value: '', name: '不限' },
      { value: '10', name: '<10' },
      { value: '20', name: '<20' },
      { value: '30', name: '<30' },
    ];
    const quality = [
      { value: '', name: '不限' },
      { value: '1', name: '高清' },
    ];
    const produce = [
      { value: '', name: '全部' },
      { value: 'professional', name: '专业' },
      { value: 'homemade', name: '自制' },
    ];
    return [
      {
        schema: 'sort',
        urlAppend: sorts.map((item) => ({
          value: item.value,
          title: item.name,
          param: 'o',
          current: judgeCurrent('sort', item.name),
        })),
      },
      {
        schema: 'max_duration',
        urlAppend: videoLength.map((item) => ({
          value: item.value,
          title: item.name,
          param: 'max_duration',
          current: judgeCurrent('max_duration', item.name),
        })),
      },
      {
        schema: 'quality',
        urlAppend: quality.map((item) => ({
          value: item.value,
          title: item.name,
          param: 'hd',
          current: judgeCurrent('quality', item.name),
        })),
      },
      {
        schema: 'produce',
        urlAppend: produce.map((item) => ({
          value: item.value,
          title: item.name,
          param: 'p',
          current: judgeCurrent('produce', item.name),
        })),
      },
    ];
  },
  getItems($) {
    const res: Item[] = [];
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
      const jumpUrl = helpElAttr($a, ElementAttr.href);

      const $info = $el.find('.thumbnail-info-wrapper');
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
        () => $info.find('.videoDetailsBlock .rating-container .value')
      );
      const $duration = $el.find('.duration');

      const flatTags = [
        { title: helpElText($views) },
        { title: helpElText($add) === '54年前' ? '' : helpElText($add) },
        { title: helpElText($rating) },
        { title: helpElText($duration) },
      ];
      res.push({
        jumpUrl: `${this.homeUrl}${jumpUrl}`,
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
    let $more = $('.paginationGated li');
    if ($more.length === 0) {
      return [];
    }
    const res = [];
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
      const url = helpElAttr($a, ElementAttr.href);
      const isCurrent = $el.hasClass('page_current');
      if (title.replace('\n', '').trim()) {
        res.push({ title, isCurrent, url: url.length > 0 ? `${this.homeUrl}${url}` : '' });
      }
    });
    const all = $('.showingCounter:eq(0)');
    if (all.length > 0) {
      res.push({ title: `${helpElText(all)}`, isCurrent: false, url: '' });
    }

    return res;
  },
  getTags($) {
    const res = [];
    $('.trendingNowWrapper > li').each((i, el) => {
      const $el = $(el);
      const $a = $el.find('a');
      const title = `${helpElText($a)}`;
      const href = helpElAttr($a, ElementAttr.href);
      const url = `${this.homeUrl}${href}`;
      res.push({ title, url });
    });
    $('.relatedSearchTermsBottom > a').each((i, el) => {
      const $a = $(el);
      const title = `${helpElText($a)}`;
      const href = helpElAttr($a, ElementAttr.href);
      const url = `${this.homeUrl}${href}`;
      res.push({ title, url });
    });
    $('.catHeaderSubMenu > li').each((i, el) => {
      const $el = $(el);
      const $a = $el.find('a');
      const $var = $a.find('var');
      const title = `${helpElAttr($a, ElementAttr.alt)}-${helpElText($var)}`;
      const href = helpElAttr($a, ElementAttr.href);
      const url = `${this.homeUrl}${href}`;
      res.push({ title, url });
    });
    return res;
  },
  async getDetailInfo(item, cheerio) {
    let html = await getHtml(item.jumpUrl);
    const $ = cheerio.load(html);
    const $title = $('title');
    const urls = [];
    const jScript = helpElText($('#player script'));
    const jsonJS = jScript.substring(jScript.indexOf('{'), jScript.indexOf('};') + 1);
    try {
      const objs = JSON.parse(jsonJS);
      objs.mediaDefinitions.forEach((item) => {
        if (typeof item.quality === 'string') {
          urls.push({ url: item.videoUrl, hd: item.quality });
        }
      });
    } catch (e) {
      MessageUtil.error('解析错误');
    }
    const title = helpElText($title);
    return {
      detailType: 'm3u8',
      renderType: 'normal',
      details: urls.map((item) => ({ type: 'm3u8', url: item.url, title, quality: item.hd })),
      relations: [],
    };
  },
  adapterLoadUrl(url, urlReplaces) {
    this.currentUrlReplace = urlReplaces;
    LogMsgUtil.sendLogMsg(`uu ${JSON.stringify(this.currentUrlReplace)}`);
    const $url = new URL(url);
    urlReplaces.forEach((item) => {
      if (item.schema === 'sort') {
        $url.searchParams.set('sort', item.urlAppend[0].value);
      }
      if (item.schema === 'durf') {
        $url.searchParams.set('durf', item.urlAppend[0].value);
      }
      if (item.schema === 'quality') {
        $url.searchParams.set('quality', item.urlAppend[0].value);
      }
    });

    return $url.toString();
  },
  adapterSearchUrl(key) {
    key = key.replace(' ', '+');
    return `${this.homeUrl}/video/search?search=${key}`;
  },
});
