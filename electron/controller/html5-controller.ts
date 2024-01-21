import { getImgBase64, requestHtml, requestHtmlByWin, requestImage } from '../http';

/**
 * 默认使用electron的request
 * @param url
 */
export const request_img_get = (url: string) => {
  return requestImage(url);
};
/**
 * 获取html
 * @param url
 */
export const request_html_get = (url: string) => {
  return requestHtml(url);
};
/**
 * 使用新窗口获取图片
 * @param url
 */
export const win_img_get = (url: string) => {
  return getImgBase64(url);
};
/**
 * 使用新窗口获取html
 * @param url
 */
export const win_html_get = (url: string) => {
  return requestHtmlByWin(url);
};
