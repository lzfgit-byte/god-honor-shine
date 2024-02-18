import type { T_search_history } from '@ghs/share';
import { T_search_history_init } from '@ghs/share';
import type { SearchHistoryType } from '@ghs/share/src';
import { TableBuilder } from '../database/init-db';
import { getCurrentDate } from '../utils/KitUtil';

let getTable = () => {
  const table = new TableBuilder<T_search_history>(T_search_history_init);
  if (!table.isTableExist()) {
    table.createTable();
  }
  getTable = () => table;
  return table;
};
export const search_history_save = (value: string, type: SearchHistoryType) => {
  const table = getTable();
  const entity: T_search_history = { type, value };
  const e = table.getByEntity(entity);
  if (e) {
    return;
  }
  table.insertData({ ...entity, time: getCurrentDate() });
};
export const search_history_list = (type: SearchHistoryType): T_search_history[] => {
  const table = getTable();
  return table.listByEntity({ type });
};
export const search_history_delete = (value: string, type: SearchHistoryType): boolean => {
  const table = getTable();
  const entity: T_search_history = { type, value };
  return table.delete(entity);
};
