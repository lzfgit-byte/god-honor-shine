import type { T_OptType } from '@/types/dbTable/tableGlobal';
export type SearchHistoryType = 'hentaiWord' | '18Comic' | 'rule34' | 'bedNews';
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
};
