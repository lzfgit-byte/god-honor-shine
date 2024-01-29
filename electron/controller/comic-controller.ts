import type { T_comic_history } from '@ghs/share';
import { T_comic_history_init } from '@ghs/share';
import { TableBuilder } from '../database/init-db';
let getTable = () => {
  const table = new TableBuilder<T_comic_history>(T_comic_history_init);
  table.createTable();
  getTable = () => table;
  return table;
};

export const c18_history_save = (data: T_comic_history) => {
  const table = getTable();
  table.insertData(data);
};
export const c18_history_delete = (data: T_comic_history): boolean => {
  const table = getTable();
  return table.delete(data);
};
export const c18_history_update = (data: T_comic_history): boolean => {
  const table = getTable();
  return table.update(data);
};
