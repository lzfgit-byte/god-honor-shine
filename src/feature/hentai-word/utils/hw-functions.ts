import { executeFunction } from '@/utils/ipc';
import type { htmlInfo } from '@/feature/hentai-word/type/hw-types';

export const hw_getHtmlInfo = (html: string): Promise<htmlInfo> =>
  executeFunction('hw_getHtmlInfo', html);
