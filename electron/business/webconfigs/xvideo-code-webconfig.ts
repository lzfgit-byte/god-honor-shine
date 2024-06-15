import type { UrlReplace, WebConfig } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { hashString } from '@ilzf/utils';

import { ElementAttr, ElementTypes } from '@ghs/constant';
import { getHtml, getHtmlWithProcess } from '../../export';
import { LogMsgUtil, NotifyMsgUtil } from '../../utils/message';
import { eventEmitter, helpElAttr, helpElText } from '../../utils/KitUtil';
import { request_string_get } from '../../http';

const getData = (): WebConfig => /* break */ ({
  key: 'xVideo',
  name: 'XV',
  favicon: 'https://www.xvideos.com/favicon.ico',
  homeUrl: 'https://www.xvideos.com',
  searchUrl: 'https://www.xvideos.com',
  imgWidth: '225px',
  imgHeight: '133px',

  drawWidth: `${3.5 * 225}px`,
  historyRemember: 100,

  setTags: ['标签', '收藏', '历史', '过滤选项', '系统配置', '日志'],

  currentUrlReplace: [
    {
      schema: 'sort',
      urlAppend: [{ value: 'relevance', param: 'sort', title: '关联', current: true }],
    },
    {
      schema: 'durf',
      urlAppend: [{ value: '', param: 'durf', title: '全部', current: true }],
    },
    {
      schema: 'quality',
      urlAppend: [{ value: '', param: 'quality', title: '全部', current: true }],
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
      { value: 'relevance', name: '关联' },
      { value: 'uploaddate', name: '上传日期' },
      { value: 'rating', name: '评级' },
      { value: 'length', name: '长度' },
      { value: 'views', name: '观看次数' },
      { value: 'random', name: '随机' },
    ];
    const durf = [
      { value: '', name: '全部' },
      { value: '1-3min', name: '1-3m' },
      { value: '3-10min', name: '3-10m' },
      { value: '10min_more', name: '>10m' },
      { value: '10-20min', name: '10-20m' },
      { value: '20min_more', name: '>20m' },
    ];
    const quality = [
      { value: '', name: '全部' },
      { value: 'hd', name: '720p+' },
      { value: '1080P', name: '1080P+' },
    ];
    return [
      {
        schema: 'sort',
        urlAppend: sorts.map((item) => ({
          value: item.value,
          title: item.name,
          param: 'sort',
          current: judgeCurrent('sort', item.name),
        })),
      },
      {
        schema: 'durf',
        urlAppend: durf.map((item) => ({
          value: item.value,
          title: item.name,
          param: 'durf',
          current: judgeCurrent('durf', item.name),
        })),
      },
      {
        schema: 'quality',
        urlAppend: quality.map((item) => ({
          value: item.value,
          title: item.name,
          param: 'quality',
          current: judgeCurrent('quality', item.name),
        })),
      },
    ];
  },
  getItems($) {
    const res = [];
    $(`#content > div > div:not(.clearfix)`).each((i, el) => {
      const $ele = $(el);
      const $el = $ele.find('.thumb-inside .thumb');
      const $a = $el.find(ElementTypes.a);
      const $img = $a.find(ElementTypes.img);
      const $HDSpan = $el.find('.video-hd-mark');

      const $title = $ele.find('.thumb-under .title > a');
      const $meta = $ele.find('.thumb-under .metadata');
      const $duration = $meta.find('.duration');
      const $nums = $meta.find('.bg > span:eq(1)');
      const txt = helpElText($nums);
      let sps: any = txt.split('-');
      sps = sps[1]?.replace('观看次数', '');

      const title = helpElAttr($title, ElementAttr.title);
      const coverImg = helpElAttr($img, ElementAttr.dataSrc) || helpElAttr($img, ElementAttr.src);
      const jumpUrl = helpElAttr($a, ElementAttr.href);
      const flatTags = [{ title: helpElText($HDSpan) }, { title: helpElText($duration) }];
      if (sps) {
        flatTags.push({ title: sps });
      }
      res.push({
        jumpUrl: `${this.homeUrl}${jumpUrl}`,
        title,
        coverImg: coverImg.replace('THUMBNUM', '3'),
        type: 'video',
        renderType: 'normal',
        tags: flatTags.filter((item) => item.title),
      });
    });
    return res;
  },

  getPagination($) {
    let $more = $('.pagination:eq(0) li');
    if ($more.length === 0) {
      return [];
    }
    const res = [];
    $more.each((i, el) => {
      // li标签
      const $el = $(el);
      const $a = $el.find('a');
      if ($a.hasClass('prev-page') || $a.hasClass('no-page')) {
        return;
      }
      //
      const title = helpElText($a);
      const url = helpElAttr($a, ElementAttr.href);
      const isCurrent = $a.hasClass('active');
      res.push({ title, isCurrent, url: url.length > 0 ? `${this.homeUrl}${url}` : '' });
    });
    if (res.every((i) => i.title !== '1')) {
      res.unshift({
        title: '1',
        isCurrent: !res.some((item) => item.isCurrent),
        url: this.homeUrl,
      });
    }

    return res;
  },
  getTags($) {
    const res = [];
    $('#main-cats-sub-list > li').each((i, el) => {
      const $el = $(el);
      const $a = $el.find('a');
      const title = `${helpElText($a)}`;
      const href = helpElAttr($a, ElementAttr.href);
      if (href === '/tags') {
        return;
      }
      const url = `${this.homeUrl}${href}`;
      res.push({ title, url });
    });
    return res;
  },
  async getDetailInfo(item, cheerio) {
    let html = await getHtmlWithProcess(item.jumpUrl);
    const $ = cheerio.load(html);
    const $title = $('#main .page-title');
    let htmls = html.split('\n');
    if (htmls.length === 0) {
      htmls = html.split('\r');
    }
    let urlRes = '';
    htmls.forEach((item) => {
      if (item.includes('html5player.setVideoHLS')) {
        urlRes = item.substring(item.indexOf('(') + 2, item.indexOf(')') - 1);
      }
    });
    const m3u8s = await request_string_get(urlRes);
    const baseM3u8 = urlRes.replace('hls.m3u8', '');
    const urls = [];
    m3u8s.split('\n').forEach((item) => {
      if (item.includes('.m3u8')) {
        const spilts = item.split('-');
        urls.push({ hd: spilts[1], url: `${baseM3u8}${item}` });
      }
    });
    // return { urls, title: helpElText($title) };
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
    return `https://www.xvideos.com/?k=${key}`;
  },
});
