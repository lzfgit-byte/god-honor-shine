import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';
const BASE_URL = 'https://rule34video.com';
interface coverImgInfo {
  src?: string;
}
interface videoInfo extends coverImgInfo {
  title?: string;
  jumpUrl?: string;
  time?: string;
  quality?: string;
}
interface pageInfo {
  current?: boolean;
  text?: string;
  jumpUrl?: string;
}
interface mainPage {
  videos?: videoInfo[];
  pages?: pageInfo[];
}
const getVideos = ($: any): videoInfo[] => {
  const res: videoInfo[] = [];
  $('#custom_list_videos_latest_videos_list .thumbs .item').each((i: any, el: any) => {
    const cEl = $(el);
    const title = cEl.find('.thumb_title').text();
    const jumpUrl = cEl.find('.js-open-popup').attr('href');
    const src = cEl.find('.img .thumb').attr('data-original');
    const time = cEl.find('.js-open-popup .time').text();
    const quality = cEl.find('.js-open-popup .quality').text();
    res.push({ title, jumpUrl, src, time, quality });
  });
  $('#custom_list_videos_videos_list_search .thumbs .item').each((i: any, el: any) => {
    const cEl = $(el);
    const title = cEl.find('.thumb_title').text();
    const jumpUrl = cEl.find('.js-open-popup').attr('href');
    const src = cEl.find('.img .thumb').attr('data-original');
    const time = cEl.find('.js-open-popup .time').text();
    const quality = cEl.find('.js-open-popup .quality').text();
    res.push({ title, jumpUrl, src, time, quality });
  });
  return res;
};
const getPages = ($: any): pageInfo[] => {
  const res: pageInfo[] = [];
  $('.pagination .item').each((i: any, el: any) => {
    const cEl = $(el);
    if (cEl.hasClass('jump_to')) {
      return;
    }
    const current = cEl.hasClass('active');
    const text = cEl.find('a').text().trim() || (cEl.hasClass('next') ? 'next' : 'prev');
    let jumpUrl = cEl.find('a').attr('href');
    if (!jumpUrl.startsWith('http')) {
      jumpUrl = BASE_URL + jumpUrl;
    }
    res.push({ current, text, jumpUrl: jumpUrl });
  });
  return res;
};
export const getRule34MainPage = (html: string): mainPage => {
  const $: CheerioAPI = cheerio.load(html);

  return { videos: getVideos($), pages: getPages($) };
};
export interface videoData {
  postFix?: string;
  videoUrl?: string;
}
const metchVideoUrl = ($: any): videoData[] => {
  const res: videoData[] = [];
  const scriptStr = $('.video_container .player')?.text()?.trim()?.split('\n');
  scriptStr.shift();
  scriptStr.pop();
  let json = '';
  let flag = false;
  scriptStr.forEach((item: string) => {
    if (item.indexOf('kt_player') > -1) {
      flag = false;
    }
    if (flag) {
      json += item;
    }
    if (item.indexOf('var flashvars') > -1) {
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
  res.push({ videoUrl: data['video_url'], postFix: data['video_url_text'] });
  res.push({ videoUrl: data['video_alt_url'], postFix: data['video_alt_url_text'] });
  res.push({ videoUrl: data['video_alt_url2'], postFix: data['video_alt_url2_text'] });
  res.push({ videoUrl: data['video_alt_url3'], postFix: data['video_alt_url3_text'] });
  return res.filter((item) => item.videoUrl);
};
const getHDInfo = (str: string) => {
  if (str.indexOf('360p') > -1 || str.indexOf('360.') > -1) {
    return '360p';
  } else if (str.indexOf('480p') > -1 || str.indexOf('480.') > -1) {
    return '480p';
  } else if (str.indexOf('720p') > -1 || str.indexOf('720.') > -1) {
    return '720p';
  } else if (str.indexOf('1080p') > -1 || str.indexOf('1080.') > -1) {
    return '1080p';
  } else {
    return '';
  }
};
export const getRule34Video = (html: string) => {
  const $: CheerioAPI = cheerio.load(html);
  // const res = metchVideoUrl($);
  // if (res?.length > 0) {
  //   return res;
  // }
  const row = $('.video_tools > .row')[0];
  const tags = $(row).find('.tag_item');
  debugger;
  const ress: videoData[] = [];
  tags.each((i) => {
    let href = $(tags[i]).attr('href') || '';
    href = href.substring(0, href.indexOf('download') - 1);
    ress.push({ videoUrl: href, postFix: getHDInfo(href) });
  });
  // if (tags.length > 0) {
  //   let href = $(tags[0]).attr('href') || '';
  //   href = href.substring(0, href.indexOf('download') - 1);
  //   return href;
  // }
  return ress;
};
