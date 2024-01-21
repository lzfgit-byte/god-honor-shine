import { getImgBase64, requestHtml, requestHtmlByWin, requestImage } from '../http';

/**
 * 默认使用electron的request
 * @param url
 */
export const request_img_get = (url: string): Promise<string> => {
  return requestImage(url) as any;
};
/**
 * 获取html
 * @param url
 */
export const request_html_get = (url: string): Promise<string> => {
  return requestHtml(url) as any;
};
/**
 * 使用新窗口获取图片
 * @param url
 */
export const win_img_get = (url: string): Promise<string> => {
  return getImgBase64(url) as any;
};
/**
 * 使用新窗口获取html
 * @param url
 */
export const win_html_get = (url: string): Promise<string> => {
  return requestHtmlByWin(url) as any;
};
