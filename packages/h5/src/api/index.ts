import type { Item, WebConfig } from '@ghs/types';
import { get } from '@/utils/request';

/**
 * 获取所有配置
 * get listAllWebConfigs
 */
export const listAllWebConfigs = async (): Promise<WebConfig[]> => {
  return get('api/listAllWebConfigs');
};
export const getCurrentWebConfig = async (webKey: string): Promise<WebConfig> => {
  return get('api/getCurrentWebConfig', { webKey });
};
/**
 * getPage
 */
export const getPage = async (webKey: string): Promise<any> => {
  return get('api/getPage', { webKey });
};
/**
 * loadPage
 */
export const loadPage = async (url: string): Promise<any> => {
  return get('api/loadPage', { url });
};
/**
 * search
 */
export const search = async (search: string, item: Item): Promise<any> => {
  return get('api/search', { search, item });
};
/**
 * /getImage
 */
export const getImage = async (url: string): Promise<any> => {
  return get('api/getImage', { url });
};
