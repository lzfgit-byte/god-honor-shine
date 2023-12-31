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
const initTableConfigData = async () => {
  const proxy = await queryConfigByKey(SYSTEM_SET_KEY.proxy);
  if (!proxy) {
    await insertTableConfig({
      key: SYSTEM_SET_KEY.proxy,
      value: 'socks5://127.0.0.1:10808',
      is_edit: 1,
    });
  }
  const needProxy = await queryConfigByKey(SYSTEM_SET_KEY.needProxy);
  if (!needProxy) {
    await insertTableConfig({ key: SYSTEM_SET_KEY.needProxy, value: 'true', is_edit: 1 });
  }
};
const createTableConfig = async () => {
  const proxy = await queryConfigByKey('proxy');
  if (proxy) {
    return;
  }
  db.run(
    `
  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT,
    is_edit integer
  )
`,
    function (err) {
      if (err) {
        logger.error('Error creating config table:', err.message);
      } else {
        initTableConfigData();
        logger.log('Config table created successfully');
      }
    }
  );
};
export interface TableHistory {
  key: string;
  value: string;
}
const createTableHistory = () => {
  db.run(
    `
  CREATE TABLE IF NOT EXISTS history (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`,
    function (err) {
      if (err) {
        logger.log('Error creating history table:', err.message);
      } else {
        logger.log('history table created successfully');
      }
    }
  );
};
createTableConfig();
createTableHistory();

export default db;
