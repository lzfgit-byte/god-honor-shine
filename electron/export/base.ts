import {
  getImgBase64ByWin,
  requestHtml,
  requestHtmlByWin,
  requestImage,
  request_string_get,
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
export const winGetDataCode = async (code: string, url: string): Promise<any> => {
  return win_get_data(code, url);
};
/**
 * 使用新窗口打开
 */
export const winOpenAny = async (url: string, code: string, width: number, height: number) => {
  win_open(url, code, width, height);
};

/**
 *获取远程data的string格式
 */
export const getDataString = async (url: string): Promise<string> => {
  return request_string_get(url);
};
