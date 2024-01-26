import type { SearchHistoryType, T_OptType } from '@/types/dbTable/tableGlobal';
import type { PageItemType } from '@/types';

export interface T_collect {
  id?: string;
  type?: SearchHistoryType;
  value?: string | PageItemType;
  time?: string;
}
const name = 'collect';
const data: T_collect = {
  id: 'id',
  type: 'hentaiWord',
  value: 'value',
  time: 'date',
};

export const T_collect_init: T_OptType = {
  data,
  tableName: name,
  orderBy: ' ORDER BY  time desc ',
};
