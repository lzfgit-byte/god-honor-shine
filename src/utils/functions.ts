import { executeFunction } from '@/utils/ipc';

export const getHtml = async (url: string): Promise<string> => executeFunction('getHtml', url);
export const getHtmlByWin = async (url: string): Promise<string> =>
  executeFunction('getHtmlByWin', url);

// 刷新
export const clearCache = async (url = null, suffix = ''): Promise<any> =>
  executeFunction('clearCache', url, suffix);
// 获取设置
export const getSetting = async (key: string): Promise<any> => executeFunction('getSetting', key);
// 设置设置
export const setSetting = async (key: string, value: any): Promise<any> =>
  executeFunction('setSetting', key, value);
export const openWindows = (url = '') => executeFunction('open-win', url);
openWindows();
export const loadUrl = (url = '') => executeFunction('open-win-only', url);
export const getImageBase64ByWin = (url: string): Promise<string> =>
  executeFunction('getImageBase64ByWin', url);
// 日志
export const getLogs = async (): Promise<any> => executeFunction('getLogs');
export const clearLogs = async (): Promise<any> => executeFunction('clearLogs');
