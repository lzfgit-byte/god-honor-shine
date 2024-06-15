import { isFalsity } from '@ilzf/utils';
import { SearchHistoryEntity } from '@ghs/constant';
import type { Item } from '@ghs/types';
import { getCurrentBusiness } from '../business/business';
import { getCurrentKey } from '../business/use-init-web-config';

/**
 * 执行搜索
 */
export const search = async (search: string, item: Item): Promise<string> => {
  const business = getCurrentBusiness(getCurrentKey());
  return business.search(search, item);
};
/**
 * 搜索推荐
 */
export const searchRecommend = async (search: string): Promise<string[]> => {
  const ents = await SearchHistoryEntity.find({ where: { type: getCurrentKey() } });
  return [...ents.map((item) => item.value)];
};
/**
 * 删除搜索记录
 */
export const deleteSearch = async (searchValue: string) => {
  const one = await SearchHistoryEntity.findOne({
    where: { type: getCurrentKey(), value: searchValue },
  });
  if (one) {
    await one.remove();
  }
};
