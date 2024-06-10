import type { Item } from '@ghs/types';
import { f_getDetailPage } from '@/utils/business';

export default () => {
  const showDetail = async (item: Item) => {
    const detail = await f_getDetailPage(item);
    console.log(detail);
  };

  return { showDetail };
};
