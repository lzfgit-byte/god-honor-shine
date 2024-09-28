import type { WebConfig } from '@ghs/types';
import { get } from '@/utils/request';

/**
 * 获取所有配置
 * get listAllWebConfigs
 */
export const listAllWebConfigs = async (): Promise<WebConfig[]> => {
  return get('api/listAllWebConfigs');
};
