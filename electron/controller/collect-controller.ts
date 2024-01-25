import type { SearchHistoryType, T_collect } from '@ghs/share';
import { T_collect_init } from '@ghs/share';
import { TableBuilder } from '../database/init-db';
import { getCurrentDate } from '../utils/KitUtil';

let getTable = () => {
  const table = new TableBuilder<T_collect>(T_collect_init);
  table.createTable();
  getTable = () => table;
  return table;
};

/**
 * value 是PageItemType的string形式
 * @param value
 * @param type
 */
export const collect_save = (value: string, type: SearchHistoryType) => {
  const table = getTable();
  const entity: T_collect = { value, type };
  const one = table.getByEntity(entity);
  if (one) {
    return;
  }
  table.insertData({ ...entity, time: getCurrentDate() });
};
export const collect_list = (type: SearchHistoryType): T_collect[] => {
  const table = getTable();
  return table.listByEntity({ type });
};
export const collect_delete = (value: string, type: SearchHistoryType): boolean => {
  const table = getTable();
  return table.delete({ value, type });
};
