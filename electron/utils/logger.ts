import * as os from 'node:os';
import { ensureFileSync, readFileSync, writeFileSync } from 'fs-extra';
import dayjs from 'dayjs';
import { APP_PATHS } from '../const/app-paths';

const LOG_FILE_PATH = `${APP_PATHS.db_dir}/log.txt`;
const getCurrentDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
const writeLog = (...args: any[]) => {
  ensureFileSync(LOG_FILE_PATH);
  writeFileSync(LOG_FILE_PATH, `[info] ${getCurrentDate()} ${args.join('')} ${os.EOL}`, {
    encoding: 'utf-8',
    flag: 'a',
  });
};
const writeLogError = (...args: any[]) => {
  ensureFileSync(LOG_FILE_PATH);
  writeFileSync(LOG_FILE_PATH, `[error] ${getCurrentDate()} ${args.join('')} ${os.EOL}`, {
    encoding: 'utf-8',
    flag: 'a',
  });
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
export const logger = {
  enable: false,
  error: (...args: any[]) => {
    writeLogError(...args);
  },
  log: (...args: any[]) => {
    writeLog(...args);
    logger.enable && console.log(...args);
  },
};
