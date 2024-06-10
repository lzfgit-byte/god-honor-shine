import type { Item, Page, WebConfig } from '@ghs/types';
import type { CollectEntity } from '@ghs/constant';
import { executeFunction } from '@/utils/ipc';

/**
 * 获取图片
 * @param url
 */
export const f_getHtml = async (url: string): Promise<string> => {
  return executeFunction('getHtml', url);
};
/**
 * 使用新窗口获取数据
 * @param url
 */
export const f_getImage = async (url: string): Promise<string> => {
  return executeFunction('getImage', url);
};
/**
 * 使用新窗口获取数据的封装
 * @param code
 * @param url
 */
export const f_winGetDataCode = async (code: string, url: string): Promise<any> => {
  return executeFunction('winGetDataCode', { code, url });
};

/**
 * 使用新窗口打开的封装
 * @param url
 * @param code
 * @param width
 * @param height
 */
export const f_winOpenAny = async (url: string, code: string, width: number, height: number) => {
  return executeFunction('winOpenAny', { url, code, width, height });
};

/**
 * 获取远程data的string格式
 * @param url
 */
export const f_getDataString = async (url: string): Promise<string> => {
  return executeFunction('getDataString', url);
};

// 后边是前端前端控制器
/**
 *获取所有的配置项
 */
export const f_listAllWebConfigs = async (): Promise<WebConfig[]> => {
  return executeFunction('listAllWebConfigs');
};
/**
 * 获取当前的key的封装
 */
export const f_getCurrentKey = async (): Promise<string> => {
  return executeFunction('getCurrentKeyExp');
};

/**
 * 获取主页基本信息的封装
 * @param key
 */
export const f_getPage = async (key: string): Promise<Page> => {
  return executeFunction('getPage', key);
};
/**
 * 代理加载页面功能
 * @param url 页面URL
 */
export const f_loadPage = async (url: string): Promise<Page> => {
  return executeFunction('loadPage', url);
};

/**
 * 调用搜索功能
 */
export const f_search = async (search: string): Promise<Page> => {
  return executeFunction('search', search);
};
/**
 * 收藏操作在这里 列出收藏
 */
export const f_listCollect = async (key: string = null): Promise<CollectEntity[]> => {
  return executeFunction('f_listCollect', key);
};
/**
 * 判断是否已经收藏
 */
export const f_isCollect = async (item: Item): Promise<boolean> => {
  return executeFunction('isCollect', item);
};
/**
 * 保存或是更新收藏
 */
export const f_saveCollect = async (item: Item) => {
  return executeFunction('saveCollect', item);
};
/**
 * 取消收藏 cancelCollect
 */
export const f_cancelCollect = async (item: Item) => {
  return executeFunction('cancelCollect', item);
};
