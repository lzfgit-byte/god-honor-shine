import type { Page } from '@ghs/types';
import { getCurrentBusiness } from '../business/business';
import { getCurrentKey } from '../business/use-init-web-config';

/**
 * 执行搜索
 */
export const search = async (search: string): Promise<Page> => {
  const business = getCurrentBusiness(getCurrentKey());
  return business.search(search);
};
