import type { SearchHistoryType } from '@ghs/share/src';
import type { T_search_history } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';
export const search_history_f_save = (value: string, type: SearchHistoryType) => {
  return executeFunction('search_history_save', value, type);
};

export const search_history_f_list = (type: SearchHistoryType): Promise<T_search_history[]> => {
  return executeFunction('search_history_list', type);
};
export const search_history_f_delete = (
  value: string,
  type: SearchHistoryType
): Promise<boolean> => {
  return executeFunction('search_history_delete', value, type);
};
