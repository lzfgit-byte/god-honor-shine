import {
  getImgBase64ByWin,
  requestHtml,
  requestHtmlByWin,
  requestImage,
  win_get_data,
  win_open,
} from '../http';
import { MessageUtil } from '../utils/message';

/**
 * 获取html
 * @param url
 */
export const getHtml = async (url: string) => {
  let html = (await requestHtml(url)) as any;
  if (html.indexOf('Just a moment...') > 0) {
    MessageUtil.info('request 失败，使用win');
    html = await requestHtmlByWin(url);
  }
  return html;
};
/**
 * 获取图片
 * @param url
 */
export const getImage = async (url: string) => {
  let str = (await requestImage(url)) as any;
  if (str.indexOf('Just a moment...') > 0 || str === '') {
    str = await getImgBase64ByWin(url);
  }
  return str;
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
