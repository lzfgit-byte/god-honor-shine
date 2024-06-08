import { join } from 'node:path';
import { EventEmitter } from 'node:events';
import dayjs from 'dayjs';

export const getCurrentDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
export const execPercentage = (cur: number, total: number): number => {
  return Math.min(+((cur / total) * 100).toFixed(0), 100);
};
export const resolvePreload = (fileName: string) => join(__dirname, `../preload/${fileName}.js`);
export const resolvePublic = (filePath: string) => join(process.env.PUBLIC, filePath);
export const eventEmitter = new EventEmitter();
