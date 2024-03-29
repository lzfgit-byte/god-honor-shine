import type { HWImgInfo, HWVideoInfo, MainPage } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const hw_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('hw_getPageInfo', html);
};
export const hw_f_getVideoInfo = (url: string): Promise<HWVideoInfo> => {
  return executeFunction('hw_getVideoInfo', url);
};
export const hw_f_getImgInfo = (url: string): Promise<HWImgInfo[]> => {
  return executeFunction('hw_getImgInfo', url);
};
