import type { WebConfig } from '@ghs/types';

const webConfig: WebConfig = /* break */ {
  key: 'hw',
  name: 'HW',
  favicon: 'https://thehentaiworld.com/favicon.ico',
  homeUrl: 'https://thehentaiworld.com/?new',
  searchUrl: 'https://thehentaiworld.com/?s=$key',

  getUrlReplace($) {
    console.log('getUrlReplace');
    return [];
  },
  getCurrentItems($) {
    console.log('getCurrentItems');
    return null;
  },
  getItemByEl(el, $) {
    console.log('getItemByEl');
    return null;
  },
  getCurrentPagination($) {
    console.log('getCurrentPagination');
    return null;
  },
  getPaginationByEl(el, $) {
    console.log('getPaginationByEl');
    return null;
  },
  getCurrentTags($) {
    console.log('getCurrentTags');
    return null;
  },
  getTagByEl(el, $) {
    console.log('getTagByEl');
    return null;
  },
  getDetailInfo(item, chee) {
    console.log('getDetailInfo');
    return null;
  },
};
/* break */

(() => (helpElAttr, helpElText) => {
  return '$code';
})();
