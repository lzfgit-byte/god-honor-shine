import type { ComicReader, MainPage } from '@ghs/share';
import type { Comic18Detail } from '@ghs/share/src';

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
