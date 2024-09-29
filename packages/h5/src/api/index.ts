import type { Item, WebConfig } from '@ghs/types';
import { get } from '@/utils/request';

/**
 * 获取所有配置
 * get listAllWebConfigs
 */
export const listAllWebConfigs = async (): Promise<WebConfig[]> => {
  return get('/listAllWebConfigs');
};
export const getCurrentWebConfig = async (webKey: string): Promise<WebConfig> => {
  return get('/getCurrentWebConfig', { webKey });
};
/**
 * getPage
 */
export const getPage = async (webKey: string): Promise<any> => {
  return get('/getPage', { webKey });
};
/**
 * loadPage
 */
export const loadPage = async (url: string): Promise<any> => {
  return get('/loadPage', { url });
};
/**
 * search
 */
export const search = async (search: string, item: Item): Promise<any> => {
  return get('/search', { search, item });
};
/**
 * /getImage
 */
export const getImage = async (url: string): Promise<any> => {
  return get('/getImage', { url });
};
/**
 * /isCollect
 */
export const isCollect = async (item: Item): Promise<any> => {
  return get('/isCollect', { item });
};
/**
 * /saveCollect
 */
export const saveCollect = async (item: Item): Promise<any> => {
  return get('/saveCollect', { item });
};
/**
 * cancelCollect
 */
export const cancelCollect = async (item: Item): Promise<any> => {
  return get('/cancelCollect', { item });
};
