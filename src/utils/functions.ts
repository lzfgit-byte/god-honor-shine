import { getImgBase64, requestImage } from '../../electron/http';
import { executeFunction } from '@/utils/ipc';

/**
 *获取html
 * @param url
 */
export const f_requestHtmlByWin = async (url: string): Promise<string> =>
  executeFunction('requestHtmlByWin', url);
/**
 * 获取图片的base64
 * @param url
 */
export const f_getImgBase64 = async (url: string): Promise<string> =>
  executeFunction('getImgBase64', url);
/**
 * 获取html,使用request
 * @param url
 */
export const f_requestHtml = async (url: string): Promise<string> =>
  executeFunction('requestHtml', url);
/**
 * 获取图片,使用request
 * @param url
 */
export const f_requestImage = async (url: string): Promise<string> =>
  executeFunction('requestImage', url);
