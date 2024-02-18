import type { SearchHistoryType, T_collect } from '@ghs/share';
import { executeFunction } from '@/utils/ipc';

/**
 * value 是PageItemType的string形式
 * @param value
 * @param type
 */
export const collect_f_save = (value: string, type: SearchHistoryType) => {
  return executeFunction('collect_save', value, type);
};
export const collect_f_list = (type: SearchHistoryType): Promise<T_collect[]> => {
  return executeFunction('collect_list', type);
};
export const collect_f_delete = (value: string, type: SearchHistoryType): Promise<boolean> => {
  return executeFunction('collect_delete', value, type);
};
