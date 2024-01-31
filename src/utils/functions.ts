import type { CacheFileType, T_logger } from '@ghs/share';
import { cache_dir_db } from '../../electron/utils';
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
/**
 *获取db文件
 */
export const f_cache_dir_db = async (): Promise<string> => executeFunction('cache_dir_db');

/**
 * 获取数据库日志
 */
export const f_logger_db_list = async (): Promise<T_logger[]> => executeFunction('logger_db_list');

/**
 * 使用新窗口获取数据
 */
export const f_win_get_data_code = (code: string, url: string): Promise<any> => {
  return executeFunction('win_get_data_code', code, url);
};

/**
 * 使用新窗口打开
 */
export const f_win_open_any = (url: string, code?: string, width?: number, height?: number) => {
  executeFunction('win_open_any', url, code, width, height);
};
