import Database from 'better-sqlite3';
import { APP_PATHS } from '../const/app-paths';
import { logger } from '../utils/logger';
const db_path = APP_PATHS.db_path;
const db = new Database(db_path, { verbose: logger.log });
const buildCreateTableSql = (data: Record<string, any>) => {};

export default db;
