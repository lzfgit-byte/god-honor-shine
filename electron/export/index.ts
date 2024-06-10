import type { BaseConfig, DetailInfo, Item, Page, WebConfig } from '@ghs/types';
import { isFalsity } from '@ilzf/utils';

import { MessageUtil } from '../utils/message';
import {
  getBaseConfigByKey,
  getCurrentKey,
  getWebConfigAry,
  setCurrentKey,
} from '../business/use-init-web-config';
import { getCurrentBusiness } from '../business/business';
// 搜索
export * from './search';
// 基础
export * from './base';
// 收藏
export * from './collect';
// 历史
export * from './history';

/**
 *获取所有的配置项
 */
export const listAllWebConfigs = async (): Promise<WebConfig[]> => {
  return getWebConfigAry();
};
/**
 *获取当前的key
 */
export const getCurrentKeyExp = async (): Promise<string> => {
  return getCurrentKey();
};
/**
 * 获取当前的config
 */
export const getCurrentWebConfig = async (key: string): Promise<BaseConfig> => {
  return getBaseConfigByKey(key);
};
/**
 * 获取主页基本信息
 * @param key
 */
export const getPage = async (key: string): Promise<Page> => {
  if (isFalsity(key)) {
    MessageUtil.error('获取页面的key 不能为空');
    return null;
  }
  setCurrentKey(key);
  const business = getCurrentBusiness(key);
  return business.getPage();
};
/**
 * 根据url 加载页面
 * @param url
 */
export const loadPage = async (url: string): Promise<Page> => {
  const business = getCurrentBusiness(getCurrentKey());
  return business.getPage(url);
};

/**
 * 获取detail
 */
export const getDetailPage = async (item: Item): Promise<DetailInfo> => {
  const business = getCurrentBusiness(getCurrentKey());
  return business.getDetailPage(item);
};
