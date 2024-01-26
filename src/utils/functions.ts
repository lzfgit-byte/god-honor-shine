import type { CacheFileType } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

/**
 *获取html
 * @param url
 */
export const f_request_img_get = async (url: string): Promise<string> =>
  executeFunction('request_img_get', url);
/**
 * 获取图片的base64
 * @param url
 */
export const f_request_html_get = async (url: string): Promise<string> =>
  executeFunction('request_html_get', url);
/**
 * 获取图片的base64
 * @param url
 */
export const f_win_img_get = async (url: string): Promise<string> =>
  executeFunction('win_img_get', url);
/**
 *获取html
 * @param url
 */
export const f_win_html_get = async (url: string): Promise<string> =>
  executeFunction('win_html_get', url);
/**
 * 清除缓存
 */
export const f_cache_suffix_clean = async (suffix?: CacheFileType): Promise<string> =>
  executeFunction('cache_suffix_clean', suffix);
/**
 * 获取缓存文件大小
 */
export const f_cache_dir_size = async (): Promise<string> => executeFunction('cache_dir_size');
