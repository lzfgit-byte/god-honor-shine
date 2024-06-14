import type { UrlReplace, WebConfig } from '@ghs/types';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { hashString } from '@ilzf/utils';

import { ElementAttr, ElementTypes } from '@ghs/constant';
import { getHtml } from '../../export';
import { LogMsgUtil, NotifyMsgUtil } from '../../utils/message';
import { eventEmitter, helpElAttr, helpElText } from '../../utils/KitUtil';

const getData = (): WebConfig => /* break */ ({
  key: 'lulu',
  name: 'lulu',
  favicon: 'https://www.pornlulu.com/favicon.ico',
  homeUrl: 'https://www.pornlulu.com',
  searchUrl: 'https://www.pornlulu.com/?q=',
  imgWidth: '223px',
  imgHeight: '140px',

  drawWidth: `${3.5 * 223}px`,
  historyRemember: 100,

  setTags: ['标签', '收藏', '历史', '过滤选项', '系统配置', '日志'],

  currentUrlReplace: [
    {
      schema: '排序',
      urlAppend: [{ value: 'id', param: 'sort', title: '最新', current: true }],
    },
  ],

  getUrlReplace($) {
    const judgeCurrent = (title) => {
      return (
        this.currentUrlReplace.filter((item) => item.schema === '排序')[0].urlAppend[0].title ===
        title
      );
    };
    const sorts = [
      { value: 'id', name: '最新' },
      { value: 'hits', name: '最多' },
      { value: 'score', name: '推荐' },
      { value: 'likes', name: '最好' },
    ];
    // [
    //   {
    //     value: '',
    //     param: 'sort',
    //     title: '最新',
    //     current: judgeCurrent('最新'),
    //   },
    // ]
    return [
      {
        schema: '排序',
        urlAppend: sorts.map((item) => ({
          value: item.value,
          param: 'sort',
          title: item.name,
          current: judgeCurrent(item.name),
        })),
      },
    ];
  },
  getItems($) {
    const res = [];
    let list = $('#videos > div');
    list.each((i, el) => {
      const $el = $(el);
      const $a = $el.find('a.visited');
      const $img = $a.find(ElementTypes.img);

      const title = helpElAttr($img, ElementAttr.alt);
      const coverImg = helpElAttr($img, ElementAttr.dataSrc) || helpElAttr($img, ElementAttr.src);
      const jumpUrl = `https://www.pornlulu.com${helpElAttr($a, ElementAttr.href)}`;
      const flatTags = [];
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
    let $more = $('#w0 > .pagination > li');
    const res = [];
    $more.each((i, el) => {
      // li标签
      const $el = $(el);
      const $a = $el.find('a');
      const disable = $a.hasClass('disabled');
      let title = helpElText($a);
      let url = helpElAttr($a, 'href');
      if (url && !url.startsWith('https://www.pornlulu.com')) {
        url = `https://www.pornlulu.com${url}`;
      }
      if (disable) {
        url = '';
      }
      const isCurrent = $el.hasClass('active');
      title = $el.hasClass('prev') ? '<<' : $el.hasClass('next') ? '>>' : title;
      res.push({ title, isCurrent, url });
    });
    return res;
  },
  getTags($) {
    const pageTags = [];
    $('#w4 > li').each((i, el) => {
      const $el = $(el);
      const $a = $el.find(ElementTypes.a);
      const $p = $el.find(ElementTypes.p);
      pageTags.push({
        title: helpElText($p),
        url: `https://www.pornlulu.com${helpElAttr($a, ElementAttr.href)}`,
      });
    });
    return pageTags;
  },
  async getDetailInfo(item, cheerio) {
    const hs = (await getHtml(item.jumpUrl)).split('\n');
    let res = '';
    hs.forEach((item, index) => {
      if (item.includes('window.location = "https://www.m3u8hls')) {
        const ss = item.split('#');
        if (ss.length === 2) {
          let url = ss[1];
          res = url.replace(`";`, '');
        }
      }
    });
    return {
      detailType: 'm3u8',
      renderType: 'normal',
      details: [
        {
          type: 'm3u8',
          url: res,
          fullUrl: '',
          title: item.title,
        },
      ],
      relations: [],
    };
  },
  adapterLoadUrl(url, urlReplaces) {
    this.currentUrlReplace = urlReplaces;
    LogMsgUtil.sendLogMsg(`uu ${JSON.stringify(this.currentUrlReplace)}`);
    url = url.replace('%20', '-');
    const urlAppend = urlReplaces[0].urlAppend[0];
    if (urlAppend) {
      let newUrl = new URL(url);
      newUrl.searchParams.set(urlAppend.param, urlAppend.value);
      return newUrl.toString();
    }
    LogMsgUtil.sendLogMsg(url);
    return url;
  },
  adapterSearchUrl(key) {
    return `https://www.pornlulu.com/?q=${key}`;
  },
});
