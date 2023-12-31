import { getImgBase64 } from '../../electron/http';
import { executeFunction } from '@/utils/ipc';

/**
 *获取html
 * @param url
 */
export const f_requestHtmlByWin = async (url: string): Promise<string> =>
  executeFunction('requestHtmlByWin', url);

export const f_getImgBase64 = async (url: string): Promise<string> =>
  executeFunction('getImgBase64', url);
