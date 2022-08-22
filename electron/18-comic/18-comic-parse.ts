const cheerio = require('cheerio');
const BASE_URL = 'https://18comic.vip';
export const loadSingle = (res: any, $: any, el: any) => {
  const cheerio$ = $(el);
  const img = cheerio$.find('img');
  const a = cheerio$.find('a');
  const coverUrl = img.attr('data-src') || img.attr('data-original') || img.attr('src');
  const jumpUrl = a.attr('href');
  const title = cheerio$.find('.video-title').text();
  const author_: any = [];
  cheerio$.find('.title-truncate.hidden-xs > a').each((i: any, el: any) => {
    author_.push($(el).text());
  });
  const type_: any = [];
  cheerio$.find('.category-icon > div').each((i: any, el: any) => {
    const title = $(el).text();
    type_.push({ title: title });
  });
  const tags_: any = [];
  cheerio$.find('.tags > a').each((i: any, el: any) => {
    const tag = $(el);
    const title = tag.text();
    const jumpUrl = BASE_URL + tag.attr('href');
    tags_.push({ title, jumpUrl });
  });
  const heart = cheerio$.find('.label-loveicon span').text();
  res.push({
    coverUrl,
    jumpUrl: BASE_URL + jumpUrl,
    title,
    author: author_.join(','),
    type: type_,
    tags: tags_,
    heart,
  });
};
/**
 * serialLatest 连载更新
 * @param html
 * @returns {{serialLatest: *[]}}
 */
export const getHomeInfo = (html: any) => {
  const $ = cheerio.load(html);
  return {
    serialLatest: getSerialLatest($),
    latestKoreanComic: getKoreanComic($),
    recommend: getRecommend($),
    latest: getLatest($),
  };
};
export const loadRes = (res: any, $: any, latest: any) => {
  $(latest)
    .children()
    .each((i: any, el: any) => {
      loadSingle(res, $, el);
    });
};
/**
 * 连载最新
 * @param $
 * @returns {*[]}
 */
export const getSerialLatest = ($: any) => {
  const latest = $('.owl-carousel.owl-comic-block')[0];
  const res: any = [];
  loadRes(res, $, latest);
  return res;
};
/**
 *最新韩漫
 * @param $
 * @returns {*[]}
 */
export const getKoreanComic = ($: any) => {
  const latest = $('.owl-carousel.owl-comic-block')[1];
  const res: any = [];
  loadRes(res, $, latest);
  return res;
};
/**
 *本子推荐
 * @param $
 * @returns {*[]}
 */
export const getRecommend = ($: any) => {
  const latest = $('.owl-carousel.owl-comic-block')[2];
  const res: any = [];
  loadRes(res, $, latest);
  return res;
};
/**
 * 最新本子
 * @param $
 * @returns {*[]}
 */
export const getLatest = ($: any) => {
  const latest = $($('.col-sm-12')[1]).find(
    '.col-xs-6.col-sm-4.col-md-3.col-lg-3.list-col.col-xl-2'
  );
  const res: any = [];
  loadRes(res, $, latest);
  return res;
};

export const getComicDetailInfo = (html: any) => {
  const $ = cheerio.load(html);
  return {
    des: $('#intro-block > div:first-child').text(),
    reading: BASE_URL + $($('a.reading')[0]).attr('href'),
    title: $('title').text(),
    contents: getContents($),
  };
};
export const getContents = ($: any) => {
  const contentConter = $('.btn-toolbar')[0];
  const res: any = [];
  $(contentConter)
    .find('a')
    .each((i: any, el: any) => {
      const $el = $(el);
      const jumpUrl = BASE_URL + $el.attr('href');
      const title = $el.find('li').text().split('\n')[1];
      res.push({ jumpUrl, title });
    });
  return res;
};

export const getReaderInfos = (html: any) => {
  const $ = cheerio.load(html);
  const imgs: any = [];
  $('.scramble-page').each((i: any, el: any) => {
    imgs.push({ src: $(el).find('img').attr('data-original') });
  });
  const html_sub = html.substring(
    html.indexOf('lang_delete_photo_ask'),
    html.indexOf('page_initial')
  );
  const infos = html_sub.split(';');
  const scramble_id$ = infos[1].split('=')[1].trim();
  const aid$ = infos[3].split('=')[1].trim();
  return { aid: aid$, imgs, scramble_id: scramble_id$ };
};
/**
 * 获取搜索也详情
 * @param html
 */
export const getSearchInfo = (html: any) => {
  const $ = cheerio.load(html);
  const res: any = [];
  let rows = $('.row.m-0 > div.col-xs-6.col-sm-6.col-md-4.col-lg-3.list-col');
  rows.each((i: any, el: any) => {
    loadSingle(res, $, el);
  });
  rows = $('.row > div.col-xs-6.col-sm-4.col-md-3.col-lg-3.list-col.col-xl-2');
  rows.each((i: any, el: any) => {
    loadSingle(res, $, el);
  });

  return { covers: res, pageInfos: getPageInfo($) };
};
export const getPageInfo = ($: any) => {
  const res: any = [];
  $('.hidden-xs .pagination > li').each((i: any, el: any) => {
    const $el = $(el);
    const isCurrent = $el.hasClass('active');
    const jumpUrl = $el.find('a').attr('href') || '';
    const title = $el.find('a').text() || $el.find('span').text();
    if (title === '') {
      return;
    }
    res.push({ isCurrent, jumpUrl, title });
  });
  return res;
};
export default {};
