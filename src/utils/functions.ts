import { executeFunction } from '@/utils/ipc';

/**
 *获取html
 * @param url
 */
export const f_getHtml = async (url: string): Promise<string> => executeFunction('getHtml', url);
/**
 * 获取图片的base64
 * @param url
 */
export const f_getImageBase64 = async (url: string): Promise<string> =>
  executeFunction('getImageBase64', url);
/**
 * 清除缓存
 */
export const f_clearCache = async (url?: string, type?: string) => {};
