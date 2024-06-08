import type { MainPage, PHVideoInfo } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const ph_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('ph_getPageInfo', html);
};
export const ph_f_getVideoInfo = (url: string): Promise<PHVideoInfo> => {
  return executeFunction('ph_getVideoInfo', url);
};
