import * as sqlite3 from 'sqlite3';
import { SYSTEM_SET_KEY } from '@ghs/share';
import { APP_PATHS } from '../const/app-paths';
import { logger } from '../utils/logger';
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

/**
 * 初始化数据库
 */
const queryConfigByKey = async (key: string): Promise<TableConfig> => {
  return new Promise((resolve, reject) => {
    db.get(`select * from config where key = '${key}'`, (e, r: TableConfig) => {
      if (e) {
        resolve(null);
        return;
      }
      resolve(r);
    });
  });
};
const insertTableConfig = async (entity: TableConfig) => {
  if (!entity.key) {
    return Promise.reject(false);
  }
  const tableConfig = await queryConfigByKey(entity.key);
  if (tableConfig) {
    logger.error('唯一值重复');
    return Promise.reject(false);
  }
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO config (key, value, is_edit) VALUES (?, ?, ?)`,
      [entity.key, entity.value || '', entity.is_edit || 1],
      function (err) {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};
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
createTableConfig();

/**
 * 创建数据库
 */
export const createTableHistory = () => {
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
createTableHistory();
export default db;
