import type { MainPage } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const lulu_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('lulu_getPageInfo', html);
};
