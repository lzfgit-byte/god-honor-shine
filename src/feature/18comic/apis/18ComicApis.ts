import type { MainPage } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const c18_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('c18_getPageInfo', html);
};
