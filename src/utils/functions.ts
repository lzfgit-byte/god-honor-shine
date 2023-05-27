import { executeFunction } from '@/utils/ipc';

export const getHtml = async (url: string): Promise<string> => executeFunction('getHtml', url);
// 刷新
export const clearCache = async (url = null, suffix = ''): Promise<any> =>
  executeFunction('clearCache', url, suffix);
