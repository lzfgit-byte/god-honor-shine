import type { MainPage } from '@ghs/share/src';
import { executeFunction } from '@/utils/ipc';

export const hw_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('hw_getPageInfo', html);
};
