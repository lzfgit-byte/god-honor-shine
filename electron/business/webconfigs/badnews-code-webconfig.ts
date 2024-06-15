import type { WebConfig } from '@ghs/types';
import { hashString } from '@ilzf/utils';
import { ElementAttr, ElementTypes } from '@ghs/constant';
import { getHtml, getHtmlWithProcess } from '../../export';
import { LogMsgUtil, NotifyMsgUtil } from '../../utils/message';
import { eventEmitter, helpElAttr, helpElText } from '../../utils/KitUtil';

const getData = (): WebConfig => /* break */ ({
  key: 'bedNews',
  name: 'BD',
  favicon: 'https://bad.news/favicon.ico',
  homeUrl: 'https://bad.news/tag/porn',
  searchUrl: 'https://bad.news',
  imgWidth: '270px',
  imgHeight: '150px',

  drawWidth: `${3.5 * 270}px`,
  historyRemember: 100,

  setTags: ['标签', '收藏', '历史', '过滤选项', '系统配置', '日志'],

  currentUrlReplace: null,

  getUrlReplace($) {
    return [];
  },
  getItems($) {
    const base_url = 'https://bad.news';
    const res = [];
    $('div.content-left div.link.show ').each((i, el) => {
      const $el = $(el);
      const $title = $el.find('h3.title > a');
      const $video = $el.find('video');
      const coverImg = helpElAttr($video, ElementAttr.poster);
      const jumpUrl = helpElAttr($video, ElementAttr.dataSource);
      if (res.some((i) => i.jumpUrl === jumpUrl)) {
        return;
      }
      const flatTags = [{ title: helpElAttr($video, ElementAttr.dataType) }];
      res.push({
        jumpUrl,
        title: helpElText($title),
        coverImg,
        type: 'video',
        renderType: 'normal',
        tags: flatTags.filter((item) => item.title),
      });
    });
    $('div.content div.spacer div.link.col-md-4').each((i, el) => {
      const $el = $(el);
      const $a = $el.find('h3.title > a:eq(0)');
      const $img = $el.find('div.coverimg img');
      const $time = $el.find('div.coverimg div.ct-time span');
      const coverImg = helpElAttr($img, ElementAttr.dataEcho);
      const jumpUrl = base_url + helpElAttr($a, ElementAttr.href);
      if (res.some((i) => i.jumpUrl === jumpUrl)) {
        return;
      }
      const flatTags = [{ title: helpElText($time) }, { title: 'av' }];
      res.push({
        jumpUrl,
        title: helpElText($a),
        coverImg,
        type: 'video',
        renderType: 'normal',
        tags: flatTags.filter((item) => item.title),
      });
    });
    $('div.stui-vodlist article').each((i, el) => {
      const $el = $(el);
      const $a = $el.find('div.thumbr > a');
      const $img = $el.find('div.thumbr img');
      const coverImg = helpElAttr($img, ElementAttr.dataEcho);
      const jumpUrl = base_url + helpElAttr($a, ElementAttr.href);
      if (res.some((i) => i.jumpUrl === jumpUrl)) {
        return;
      }
      const flatTags = [{ title: 'dm' }];
      res.push({
        jumpUrl,
        title: helpElAttr($img, ElementAttr.alt),
        coverImg,
        type: 'video',
        renderType: 'normal',
        tags: flatTags.filter((item) => item.title),
      });
    });
    return res;
  },

  getPagination($) {
    let $more = $('.pagination > ul > li');
    if ($more.length === 0) {
      return [];
    }
    const res = [];
    $more.each((i, el) => {
      // li标签
      const $el = $(el);
      const $a = $el.find('a');
      //
      let title = helpElText($a);
      title = title.replace(/\n/g, '');
      const url = `${this.homeUrl}${helpElAttr($a, 'href')}`;
      const isCurrent = $a.hasClass('active');
      if (title === '下一页' && !res.some((i) => i.title === '下一页')) {
        res.push({ title, isCurrent, url });
        return;
      }
      if (title === '...' && !res.some((i) => i.title === '...')) {
        res.push({ title, isCurrent, url });
        return;
      }
      if (res.some((i) => i.url === url) && res.some((i) => i.title === title)) {
        return;
      }
      res.push({ title, isCurrent, url });
    });
    return res;
  },
  getTags($) {
    const res = [
      { title: '短视频', url: 'https://bad.news/tag/porn' },
      { title: '长视频', url: 'https://bad.news/tag/long-porn' },
      { title: '日本AV', url: 'https://bad.news/av' },
      { title: '动漫', url: 'https://bad.news/dm' },
    ];
    $('div.input-group ul.list-inline a').each((i, el) => {
      const $a = $(el);
      const title = `${helpElText($a)}`;
      if (title.includes('更多')) {
        return;
      }
      const url = `https://bad.news${helpElAttr($a, ElementAttr.href)}`;
      res.push({ title, url });
    });
    return res;
  },
  async getDetailInfo(item, cheerio) {
    const { tags, jumpUrl } = item;
    if (tags.some((item) => item.title === 'm3u8')) {
      return {
        detailType: 'm3u8',
        renderType: 'normal',
        details: [
          {
            type: 'm3u8',
            url: jumpUrl,
            fullUrl: '',
            title: item.title,
          },
        ],
        relations: [],
      };
    }
    if (tags.some((item) => item.title === 'mp4')) {
      return {
        detailType: 'mp4',
        renderType: 'normal',
        details: [
          {
            type: 'mp4',
            url: jumpUrl,
            fullUrl: '',
            title: item.title,
          },
        ],
        relations: [],
      };
    }
    if (tags.some((item) => item.title === 'av') || tags.some((item) => item.title === 'dm')) {
      const html = await getHtmlWithProcess(item.jumpUrl);
      const $ = cheerio.load(html);
      const $video = $('video');
      const jumpUrl = helpElAttr($video, ElementAttr.dataSource);
      let type: any = helpElAttr($video, ElementAttr.dataType);
      if (type === '') {
        type = jumpUrl.includes('m3u8') ? 'm3u8' : 'mp4';
      }
      return {
        detailType: type,
        renderType: 'normal',
        details: [
          {
            type,
            url: jumpUrl,
            fullUrl: '',
            title: item.title,
          },
        ],
        relations: [],
      };
    }
  },
  adapterLoadUrl(url) {
    return url;
  },
  adapterSearchUrl(key, items) {
    if (items) {
      const flatTags = items.tags;
      if (flatTags.some((i) => i.title === 'dm')) {
        return `https://bad.news/dm/search/q-${key}`;
      } else if (flatTags.some((i) => i.title === 'av')) {
        return `https://bad.news/av/search/q-${key}`;
      } else {
        return `https://bad.news/search/q-${key}/type-porn`;
      }
    }
  },
});
