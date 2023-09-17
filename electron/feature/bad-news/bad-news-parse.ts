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
  tags?: string[];
  pages?: pageType[]; // 分页
}
const loadVideoUrl = async (jumpUrl: string): Promise<string> => {
  let html: string = (await getHtml(jumpUrl)) as any;
  html = html?.substring(html.indexOf('urls[0] = ["') + 12);
  html = html?.substring(0, html.indexOf('"];'));
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
export const badNews_getBadNewsInfo = async (html: string): Promise<pageInfo> => {
  const $: CheerioAPI = cheerio.load(html);

  return { video: await getVideos($) };
};
