import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import { sendMessage } from '../../utils/message';
const BASE_URL = 'https://rule34video.com';
interface coverImgInfo {
  src?: string;
}
interface videoInfo extends coverImgInfo {
  title?: string;
  jumpUrl?: string;
  time?: string;
  quality?: string;
  views?: string;
  added?: string;
}
interface pageInfo {
  current?: boolean;
  text?: string;
  jumpUrl?: string;
  fromAlbums?: string;
}
interface mainPage {
  videos?: videoInfo[];
  pages?: pageInfo[];
}
const rule34_addVideoRes = ($: any, el: any, res: videoInfo[]) => {
  const cEl = $(el);
  const title = cEl.find('.thumb_title').text();
  const jumpUrl = cEl.find('.js-open-popup').attr('href');
  const src = cEl.find('.img .thumb').attr('data-original');
  const time = cEl.find('.js-open-popup .time').text();
  const quality = cEl.find('.js-open-popup .quality').text();
  const views = cEl.find('.thumb_info .views').text();
  const added = cEl.find('.thumb_info .added').text();
  res.push({ title, jumpUrl, src, time, quality, views, added });
};
const rule34_getVideos = ($: any): videoInfo[] => {
  const res: videoInfo[] = [];
  sendMessage('video 数据解析开始');
  $('#custom_list_videos_latest_videos_list .thumbs .item').each((i: any, el: any) => {
    rule34_addVideoRes($, el, res);
  });
  $('#custom_list_videos_videos_list_search .thumbs .item').each((i: any, el: any) => {
    rule34_addVideoRes($, el, res);
  });
  sendMessage(`video 数据解析结束,数量:${res.length}`);
  return res;
};
const rule34_getPages = ($: any): pageInfo[] => {
  const res: pageInfo[] = [];
  $('.pagination .item').each((i: any, el: any) => {
    const cEl = $(el);
    if (cEl.hasClass('jump_to')) {
      return;
    }
    const current = cEl.hasClass('active');
    const text = cEl.find('a').text().trim() || (cEl.hasClass('next') ? 'next' : 'prev');
    let jumpUrl = cEl.find('a').attr('href');
    const fromAlbums = cEl.find('a').attr('data-parameters');
    if (!jumpUrl.startsWith('http')) {
      jumpUrl = BASE_URL + jumpUrl;
    }
    res.push({ current, text, jumpUrl, fromAlbums });
  });
  return res;
};
export const rule34_getRule34MainPage = (html: string): mainPage => {
  const $: CheerioAPI = cheerio.load(html);

  return { videos: rule34_getVideos($), pages: rule34_getPages($) };
};
export interface videoData {
  postFix?: string;
  videoUrl?: string;
}
const rule34_metchVideoUrl = ($: any): videoData[] => {
  const res: videoData[] = [];
  const scriptStr = $('.video_container .player')?.text()?.trim()?.split('\n');
  scriptStr.shift();
  scriptStr.pop();
  let json = '';
  let flag = false;
  scriptStr.forEach((item: string) => {
    if (item.includes('kt_player')) {
      flag = false;
    }
    if (flag) {
      json += item;
    }
    if (item.includes('var flashvars')) {
      flag = true;
      json += item;
    }
  });
  const data: any = {};
  const jSplit = json.split(',');
  jSplit.forEach((key) => {
    const keys = key.split(': ');
    if (keys.length === 2) {
      const daKey = keys[0].trim();
      const value = keys[1].replace('function/0/', '').replace("'", '').replace("'", '').trim();
      data[daKey] = value;
    }
  });
  res.push({ videoUrl: data.video_url, postFix: data.video_url_text });
  res.push({ videoUrl: data.video_alt_url, postFix: data.video_alt_url_text });
  res.push({ videoUrl: data.video_alt_url2, postFix: data.video_alt_url2_text });
  res.push({ videoUrl: data.video_alt_url3, postFix: data.video_alt_url3_text });
  return res.filter((item) => item.videoUrl);
};
const rule34_getHDInfo = (str: string) => {
  if (str.includes('360p') || str.includes('360.')) {
    return '360p';
  } else if (str.includes('480p') || str.includes('480.')) {
    return '480p';
  } else if (str.includes('720p') || str.includes('720.')) {
    return '720p';
  } else if (str.includes('1080p') || str.includes('1080.')) {
    return '1080p';
  } else {
    return '';
  }
};
export const rule34_getRule34Video = (html: string) => {
  const $: CheerioAPI = cheerio.load(html);
  // const res = metchVideoUrl($);
  // if (res?.length > 0) {
  //   return res;
  // }
  const row = $('.video_tools > .row')[0];
  const tags = $(row).find('.tag_item');
  const ress: videoData[] = [];
  tags.each((i) => {
    let href = $(tags[i]).attr('href') || '';
    href = href.substring(0, href.indexOf('download') - 1);
    ress.push({ videoUrl: href, postFix: rule34_getHDInfo(href) });
  });
  // if (tags.length > 0) {
  //   let href = $(tags[0]).attr('href') || '';
  //   href = href.substring(0, href.indexOf('download') - 1);
  //   return href;
  // }
  return ress;
};
