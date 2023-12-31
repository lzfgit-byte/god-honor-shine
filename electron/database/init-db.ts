import * as sqlite3 from 'sqlite3';
import { APP_PATHS } from '../const/app-paths';
import { logger } from '../utils/logger';
import { SYSTEM_SET_KEY } from '../const/system';
import { insertTableConfig, queryConfigByKey } from './table-config';
const db_path = APP_PATHS.db_path;
const db = new sqlite3.Database(db_path, (err) => {
  if (!err) {
    return;
  }
  logger.log(`数据库创建失败:${err?.message}`);
});
export interface TableConfig {
  key: string;
  value: string;
  is_edit: number;
}
export interface TableHistory {
  key: string;
  value: string;
}

export default db;
