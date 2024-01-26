import * as os from 'node:os';
import { ensureFileSync, readFileSync, writeFileSync } from 'fs-extra';
import type { T_logger } from '@ghs/share';
import { T_logger_init } from '@ghs/share';
import { APP_PATHS } from '../const/app-paths';
import { TableBuilder } from '../database/init-db';
import { getCurrentDate } from './KitUtil';

const LOG_FILE_PATH = `${APP_PATHS.db_dir}/log.txt`;

const writeLog = (...args: any[]): string => {
  ensureFileSync(LOG_FILE_PATH);
  const info = `[info] ${getCurrentDate()} ${args.join('')} ${os.EOL}`;
  writeFileSync(LOG_FILE_PATH, info, {
    encoding: 'utf-8',
    flag: 'a',
  });
  return info;
};
const writeLogError = (...args: any[]) => {
  ensureFileSync(LOG_FILE_PATH);
  const error = `[error] ${getCurrentDate()} ${args.join('')} ${os.EOL}`;
  writeFileSync(LOG_FILE_PATH, `[error] ${getCurrentDate()} ${args.join('')} ${os.EOL}`, {
    encoding: 'utf-8',
    flag: 'a',
  });
  return error;
};
export const getLogs = () => {
  ensureFileSync(LOG_FILE_PATH);
  return readFileSync(LOG_FILE_PATH, { encoding: 'utf-8' });
};
export const clearLogs = () => {
  ensureFileSync(LOG_FILE_PATH);
  writeFileSync(LOG_FILE_PATH, '', {
    encoding: 'utf-8',
    flag: 'w',
  });
};
let getLoggerDb = () => {
  const table = new TableBuilder<T_logger>(T_logger_init);
  if (table.isTableExist()) {
    table.clearTable();
  } else {
    table.createTable();
  }

  getLoggerDb = () => table;
  return table;
};

export const logger_db_list = (): T_logger[] => {
  const table = getLoggerDb();
  return table.listByEntity(null);
};
export const logger = {
  enable: false,
  error: (...args: any[]) => {
    writeLogError(...args);
  },
  log: (...args: any[]) => {
    writeLog(...args);
    logger.enable && console.log(...args);
  },
  db_log: (...args: any[]) => {
    const table = getLoggerDb();
    table.insertData({ type: 'info', value: writeLog(...args), time: getCurrentDate() });
  },
  db_error: (...args: any[]) => {
    const table = getLoggerDb();
    table.insertData({ type: 'error', value: writeLogError(...args), time: getCurrentDate() });
  },
};
