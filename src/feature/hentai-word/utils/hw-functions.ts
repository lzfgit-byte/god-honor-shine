import { executeFunction } from '@/utils/ipc';
import type { htmlInfo, videoInfo } from '@/feature/hentai-word/type/hw-types';

export const hw_getHtmlInfo = (html: string): Promise<htmlInfo> =>
  executeFunction('hw_getHtmlInfo', html);
export const hw_getVideoInfo = (html: string): Promise<videoInfo> =>
  executeFunction('hw_getVideoInfo', html);
