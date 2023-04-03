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
  $('#custom_list_videos_most_recent_videos_items .item').each((i: any, el: any) => {
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
    const text = cEl.find('a').text().trim() || (cEl.hasClass('next') && 'next');
    const jumpUrl = cEl.find('a').attr('href');
    res.push({ current, text, jumpUrl: BASE_URL + jumpUrl });
  });
  return res;
};
export const getRule34MainPage = (html: string): mainPage => {
  const $: CheerioAPI = cheerio.load(html);

  return { videos: getVideos($), pages: getPages($) };
};
