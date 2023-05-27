import { executeFunction } from '@/utils/ipc';
import type { htmlInfo, imgInfo, videoInfo } from '@/feature/hentai-word/type/hw-types';

export const hw_getHtmlInfo = (html: string): Promise<htmlInfo> =>
  executeFunction('hw_getHtmlInfo', html);
export const hw_getVideoInfo = (html: string): Promise<videoInfo> =>
  executeFunction('hw_getVideoInfo', html);
export const hw_getImgInfo = (html: string): Promise<imgInfo> =>
  executeFunction('hw_getImgInfo', html);
export const hw_getImgInfoOnly = (html: string): Promise<imgInfo> =>
  executeFunction('hw_getImgInfoOnly', html);
