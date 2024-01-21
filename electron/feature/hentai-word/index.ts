import * as cheerio from 'cheerio';
/**
 * 获取主要
 * { type: '', coverUrl: '', jumpUrl: '', count: 0 }
 * @param $
 * @returns {*|jQuery}
 */
export const hw_getMainHtml = ($: any) => {
  const items: any = [];
  $('#thumbContainer .thumb').each((i: any, el: any) => {
    const cheerio$ = $(el);
    const coverUrl = cheerio$.find('[itemprop="thumbnail"]').attr('src');
    const width = cheerio$.find('[itemprop="thumbnail"]').attr('width');
    const height = cheerio$.find('[itemprop="thumbnail"]').attr('height');
    const title = cheerio$.find('[itemprop="thumbnail"]').attr('alt');
    const jumpUrl = cheerio$.find('a').attr('href');
    const type = cheerio$.find('h4').text() || '';
    const count = cheerio$.find('span').text();
    items.push({ type, coverUrl, jumpUrl, width, height, count, title });
  });
  return items;
};
/**
 * 获取分页信息
 * { pageNumber, jumpUrl }
 * @param $
 * @returns {*[]}
 */
export const hw_getPageInfo = ($: any) => {
  const pages: any = [];
  $('#more-hentai li').each((i: any, el: any) => {
    const cheerio$ = $(el);
    const page = cheerio$.find('.page');
    const prev = cheerio$.find('.prev');
    const gap = cheerio$.find('.gap');
    const next = cheerio$.find('.next');
    const current = cheerio$.find('.current');
    if (prev.attr('href')) {
      pages.push({ isCurrent: false, pageNumber: prev.text(), jumpUrl: prev.attr('href') });
    } else if (current.text()) {
      pages.push({ isCurrent: true, pageNumber: current.text(), jumpUrl: '' });
    } else if (page.attr('href')) {
      pages.push({ isCurrent: false, pageNumber: page.text(), jumpUrl: page.attr('href') });
    } else if (gap.text()) {
      pages.push({ isCurrent: false, pageNumber: gap.text(), jumpUrl: '' });
    } else if (next.attr('href')) {
      pages.push({ isCurrent: false, pageNumber: next.text(), jumpUrl: next.attr('href') });
    }
  });
  return pages;
};
/**
 * 获取标签信息
 * @param $
 * @returns {*[]}
 */
export const hw_getPageTags = ($: any) => {
  const pages: any = [];
  $('#tags li').each((i: any, el: any) => {
    const cheerio$ = $(el);
    const jumpUrl = cheerio$.find('a').attr('href') || '';
    const tageName = cheerio$.find('a').text() || '';
    const count = cheerio$.find('span').text();

    pages.push({ tageName, jumpUrl: `https:${jumpUrl}`, count });
  });
  return pages;
};
export const hw_getHtmlInfo = (html: any) => {
  const $ = cheerio.load(html);
  return {
    mainHtml: hw_getMainHtml($),
    pageInfo: hw_getPageInfo($),
    tags: hw_getPageTags($),
  };
};

// 获取详细的视频信息
export const hw_getVideoInfo = (html: any) => {
  const $ = cheerio.load(html);
  const videoSrc = $('#video source').attr('src');
  const tite = $('#grid > h1').text();
  return { videoSrc, tite };
};

/**
 *
 * @param html
 * @returns {{original: (*|jQuery|string), zipUrl: string, name: string, others: *[]}}
 */
export const hw_getImgInfo = (html: any) => {
  const $ = cheerio.load(html);
  const original = $('#info > li:nth-child(3) > a').attr('href') || '';
  const img = $('.doujin-page');
  const zipUrl = img.attr('src');
  const name = img.attr('alt');
  const others: any = [];
  $('#miniThumbContainer .minithumb').each((i, el) => {
    const cheerio$ = $(el);
    const isCurrent = cheerio$.hasClass('current');
    const coverUrl = cheerio$.find('img').attr('src');
    const name = cheerio$.find('img').attr('alt');
    const number = cheerio$.find('h4').text();
    const jumpUrl = cheerio$.find('a').attr('href');
    others.push({ isCurrent, coverUrl, number, name, jumpUrl });
  });
  return { original, zipUrl, name, others };
};
export const hw_getImgInfoOnly = (html: any) => {
  const $ = cheerio.load(html);
  const original = $('#info > li:nth-child(3) > a').attr('href') || '';
  const img = $('#doujin img');
  const zipUrl = img.attr('src');
  const name = img.attr('alt');
  return { original, zipUrl, name };
};
