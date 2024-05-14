import type { MainPage, XVVideoInfo } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const xv_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('xv_getPageInfo', html);
};
export const xv_f_getVideoInfo = (url: string): Promise<XVVideoInfo> => {
  return executeFunction('xv_getVideoInfo', url);
};
