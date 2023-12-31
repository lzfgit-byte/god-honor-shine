import * as sqlite3 from 'sqlite3';
import { APP_PATHS } from '../const/app-paths';
import { logger } from '../utils/logger';
const db_path = APP_PATHS.db_path;
let db = new sqlite3.Database(db_path, (err) => {
  if (!err) {
    return;
  }
  logger.log(`数据库创建失败:${err?.message}`);
});

const createTableConfig = () => {
  db.run(
    `
  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`,
    function (err) {
      if (err) {
        logger.log('Error creating config table:', err.message);
      } else {
        logger.log('Config table created successfully');
      }
    }
  );
};
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
