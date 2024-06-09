import type { WebConfig } from '@ghs/types';
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

/**
 * 前端控制器
 */
export const f_listAllWebConfigs = async (): Promise<WebConfig[]> => {
  return executeFunction('listAllWebConfigs');
};
