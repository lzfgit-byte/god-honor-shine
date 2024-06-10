import type { Page, WebConfig } from '@ghs/types';
import { isFalsity } from '@ilzf/utils';
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
import { getCurrentKey, getWebConfigAry, setCurrentKey } from '../business/use-init-web-config';
import { getCurrentBusiness } from '../business/business';

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
// 后边是前端前端控制器

/**
 *获取所有的配置项
 */
export const listAllWebConfigs = async (): Promise<WebConfig[]> => {
  return getWebConfigAry();
};
/**
 *获取当前的key
 */
export const getCurrentKeyExp = async (): Promise<string> => {
  return getCurrentKey();
};
/**
 * 获取主页基本信息
 * @param key
 */
export const getPage = async (key: string): Promise<Page> => {
  if (isFalsity(key)) {
    MessageUtil.error('获取页面的key 不能为空');
    return null;
  }
  setCurrentKey(key);
  const business = getCurrentBusiness(key);
  return business.getPage();
};
/**
 * 根据url 加载页面
 * @param url
 */
export const loadPage = async (url: string): Promise<Page> => {
  const business = getCurrentBusiness(getCurrentKey());
  return business.getPage(url);
};

/**
 * 执行搜索
 */
export const search = async (search: string): Promise<Page> => {
  const business = getCurrentBusiness(getCurrentKey());
  return business.search(search);
};
