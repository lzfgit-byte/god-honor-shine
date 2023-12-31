import * as os from 'node:os';
import { ensureFileSync, readFileSync, writeFileSync } from 'fs-extra';
import dayjs from 'dayjs';
import { getAppDataPath } from '../common';

const LOG_FILE_PATH = `${getAppDataPath()}/log.txt`;
const getCurrentDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
const writeLog = (...args) => {
  ensureFileSync(LOG_FILE_PATH);
  writeFileSync(LOG_FILE_PATH, `${getCurrentDate()} ${args.join('')} ${os.EOL}`, {
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
  log: (...args) => {
    writeLog(...args);
    logger.enable && console.log(...args);
  },
};
