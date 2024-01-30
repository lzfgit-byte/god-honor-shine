import type { BadNewVideoInfo, MainPage } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const bdn_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('bdn_getPageInfo', html);
};

export const bdn_f_getVideoInfo = async (url: string): Promise<BadNewVideoInfo> => {
  return executeFunction('bdn_getVideoInfo', url);
};
