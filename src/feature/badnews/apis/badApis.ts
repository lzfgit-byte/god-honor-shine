import type { MainPage } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const bdn_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('bdn_getPageInfo', html);
};
