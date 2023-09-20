import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import { getHtml } from '../../utils';
const BASE_URL = 'https://bad.news';
type videType = '长视频' | '' | string;
interface pageType {
  jumpUrl?: string;
  page?: string;
  isCurrent?: boolean;
}
interface tagType {
  name?: string;
  url?: string;
}
interface video {
  title?: string;
  coverUrl?: string;
  videType?: videType;
  jumpUrl?: string;
  videoUrl?: string;
  time?: string;
}
interface pageInfo {
  video?: video[];
  tags?: tagType[];
  pages?: pageType[]; // 分页
}
export const badNews_loadVideoUrl = async (jumpUrl: string): Promise<string> => {
  let html: string = (await getHtml(jumpUrl)) as any;
  html = html.replace(/[\r|\n]/g, '');
  if (html.indexOf('urls[0] = ["') > 0) {
    html = html?.substring(html.indexOf('urls[0] = ["') + 12);
    html = html?.substring(0, html.indexOf('"];'));
  } else {
    html = html?.substring(html.indexOf("urls[0] = ['") + 12);
    html = html?.substring(0, html.indexOf("'];"));
  }
  return html;
};
const getVideos = async ($: CheerioAPI): Promise<video[]> => {
  const res = [];
  const items = $('.spacer .link.show');
  const funEacg = async (index, el) => {
    const cEl = $(el);
    const title = cEl.find('.title').text();
    const coverUrl =
      cEl?.find('.coverimg img.lazy')?.attr('data-echo') || cEl.find('video')?.attr('data-echo');
    const videType = cEl?.find('.ct-time-left span')?.text();
    const jumpUrl = BASE_URL + cEl.find('.coverdiv a')?.attr('href');
    const videoUrl = cEl.find('.dateline[title="点击下载视频"]').attr('href');
    const time = cEl.find('time')?.text();
    res.push({ title, coverUrl, videType, jumpUrl, videoUrl, time });
  };
  // @ts-expect-error
  items.each(funEacg);
  return res;
};
const getPages = ($: CheerioAPI): pageType[] => {
  const res: pageType[] = [];
  $('.pagination li').each((index, el) => {
    const cEl = $(el);
    const isCurrent = cEl.find('a').hasClass('active');
    const jumpUrl = BASE_URL + cEl.find('a').attr('href');
    const page = cEl.find('a').text();
    if (res.some((item) => item.page === page)) {
      return;
    }
    res.push({ isCurrent, jumpUrl, page });
  });
  return res;
};
const getTages = ($: CheerioAPI): tagType[] => {
  const res: tagType[] = [];
  res.push({ name: '热门', url: 'https://bad.news/tag/porn/sort-hot' });
  res.push({ name: '最新', url: 'https://bad.news/tag/porn/sort-new' });
  res.push({ name: '得分', url: 'https://bad.news/tag/porn/sort-score' });
  res.push({ name: '精选', url: 'https://bad.news/tag/porn/sort-better' });
  $('#search_form .list-inline li').each((index, el) => {
    const cEl = $(el);
    const url = cEl.find('a').attr('href');
    const name = cEl.find('a').text();
    if (url && !name.includes('更多热搜')) {
      res.push({ name, url: BASE_URL + url });
    }
  });
  return res;
};
export const badNews_getBadNewsInfo = async (html: string): Promise<pageInfo> => {
  const $: CheerioAPI = cheerio.load(html);

  return { video: await getVideos($), pages: getPages($), tags: getTages($) };
};
const getAVVideos = async ($: CheerioAPI): Promise<video[]> => {
  const res: video[] = [];
  const lists = $('.content .spacer .link.col-md-4');
  for (let i = 0; i < lists.length; i++) {
    const cEl = $(lists[i]);
    const title = cEl.find('.entry h3.title a.title').text();
    const coverUrl = cEl.find('.entry .coverdiv img.lazy').attr('data-echo');
    const videType = cEl.find('.ct-time-left span').text();
    const jumpUrl = BASE_URL + cEl.find('.entry .title a')?.attr('href');
    const videoUrl = '';
    // cEl?.find('.dateline[title="点击下载视频"]')?.attr('href') || (await getAvVideoUrl(jumpUrl));
    const time = cEl.find('.entry .coverdiv .ct-time span').text();
    res.push({ title, coverUrl, videType, jumpUrl, videoUrl, time });
  }
  return res;
};
const getAvTages = ($: CheerioAPI): tagType[] => {
  const res: tagType[] = [];
  $('#search_form .list-inline li').each((index, el) => {
    const cEl = $(el);
    const url = cEl.find('a').attr('href');
    if (url) {
      res.push({ name: cEl.find('a').text(), url: BASE_URL + url });
    }
  });
  return res;
};
export const badNews_getAVPageInfo = async (html: string): Promise<pageInfo> => {
  const $: CheerioAPI = cheerio.load(html);

  return { video: await getAVVideos($), pages: getPages($), tags: getAvTages($) };
};
const getDMVideos = async ($: CheerioAPI): Promise<video[]> => {
  const res: video[] = [];
  const lists = $('.auto-clear.stui-vodlist article');
  for (let i = 0; i < lists.length; i++) {
    const cEl = $(lists[i]);
    const title = cEl.find('.infor a.title').text();
    const coverUrl = cEl.find('.thumbr img.img-responsive').attr('data-echo');
    const videType = cEl.find('.ct-time-left span').text();
    const jumpUrl = BASE_URL + cEl.find('.infor a.title')?.attr('href');
    const videoUrl = '';
    // cEl?.find('.dateline[title="点击下载视频"]')?.attr('href') || (await getDmVideoUrl(jumpUrl));
    const time = cEl.find('.entry .coverdiv .ct-time span').text();
    res.push({ title, coverUrl, videType, jumpUrl, videoUrl, time });
  }
  return res;
};
export const badNews_getDMPageInfo = async (html: string): Promise<pageInfo> => {
  const $: CheerioAPI = cheerio.load(html);

  return { video: await getDMVideos($), pages: getPages($) };
};
