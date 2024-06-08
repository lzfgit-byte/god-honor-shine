import type { SearchHistoryType, T_OptType } from '@/types/dbTable/tableGlobal';
import type { PageItemType } from '@/types';
// 收藏
export interface T_collect {
  id?: string;
  type?: SearchHistoryType;
  value?: string | PageItemType;
  count?: string;
  time?: string;
}
const name = 'collect';
//
const data: T_collect = {
  id: 'id',
  type: 'hentaiWord',
  value: '{}',
  time: '2024-01-26 20:37:27',
  count: '1',
};

export const T_collect_init: T_OptType = {
  data,
  tableName: name,
  orderBy: ` ORDER BY cast(count as '9999') desc,time desc `,
};
