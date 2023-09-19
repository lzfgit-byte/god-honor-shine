import { executeFunction } from '@/utils/ipc';

export const badNews_getBadNewsInfo = (html: string): Promise<any> =>
  executeFunction('badNews_getBadNewsInfo', html);
export const badNews_getAVPageInfo = (html: string): Promise<any> =>
  executeFunction('badNews_getAVPageInfo', html);
export const badNews_getDMPageInfo = (html: string): Promise<any> =>
  executeFunction('badNews_getDMPageInfo', html);
