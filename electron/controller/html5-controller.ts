import {
  getImgBase64,
  requestHtml,
  requestHtmlByWin,
  requestImage,
  win_get_data,
  win_open,
} from '../http';
import { sendMessage } from '../utils/message';

/**
 * 默认使用electron的request
 * @param url
 */
export const request_img_get = async (url: string): Promise<string> => {
  let str = (await requestImage(url)) as any;
  if (str.indexOf('Just a moment...') > 0 || str === '') {
    str = await win_img_get(url);
  }
  return str;
};
/**
 * 获取html
 * @param url
 */
export const request_html_get = async (url: string): Promise<string> => {
  let html = (await requestHtml(url)) as any;
  if (html.indexOf('Just a moment...') > 0) {
    sendMessage('request 失败，使用win');
    html = await win_html_get(url);
  }
  return html;
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
/**
 * 使用新窗口获取数据
 * @param url
 */
export const win_get_data_code = (code: string, url: string): Promise<any> => {
  return win_get_data(code, url);
};
/**
 * 使用新窗口打开
 */
export const win_open_any = (url: string, code: string, width: number, height: number) => {
  win_open(url, code, width, height);
};
