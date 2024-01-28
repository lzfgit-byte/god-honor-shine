import type { MainPage } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

export const r34_f_getPageInfo = (html: string): Promise<MainPage> => {
  return executeFunction('r34_getPageInfo', html);
};
