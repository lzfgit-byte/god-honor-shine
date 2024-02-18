import type { SearchHistoryType, T_OptType } from '@/types/dbTable/tableGlobal';

export interface T_search_history {
  id?: string;
  type?: SearchHistoryType;
  value?: string;
  time?: string;
}
const name = 'search_history';
const data: T_search_history = {
  id: 'id',
  type: 'hentaiWord',
  value: 'value',
  time: 'date',
};

export const T_search_history_init: T_OptType = {
  data,
  tableName: name,
  orderBy: ' ORDER BY  time desc ',
};
