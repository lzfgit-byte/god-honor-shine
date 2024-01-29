import type { Comic18Detail, ComicReader, MainPage, T_comic_history } from '@ghs/share';

import { c18_history_saveOrUpdate } from '../../../../electron/controller/comic-controller';
import { executeFunction } from '@/utils/ipc';

export const c18_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('c18_getPageInfo', html);
};
export const c18_f_get_contents = (html: string): Promise<Comic18Detail> => {
  return executeFunction('c18_get_contents', html);
};
/**
 *获取全部图片
 * @param html
 */
export const c18_f_get_images = (html: string): Promise<ComicReader[]> => {
  return executeFunction('c18_get_images', html);
};

export const c18_f_history_saveOrUpdate = (data: T_comic_history) => {
  return executeFunction('c18_history_saveOrUpdate', data);
};
export const c18_f_history_delete = (data: T_comic_history): Promise<boolean> => {
  return executeFunction('c18_history_delete', data);
};
export const c18_f_history_update = (data: T_comic_history): Promise<boolean> => {
  return executeFunction('c18_history_update', data);
};
export const c18_f_history_get = (data: T_comic_history): Promise<T_comic_history> => {
  return executeFunction('c18_history_get');
};
