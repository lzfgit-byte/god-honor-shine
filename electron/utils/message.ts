import { ipcMain, webContents } from 'electron';
import { SYS_GLOB_KEY } from '../const/system';
import { logger } from './logger';

export const sendMessage = (msg: string) => {
  logger.log(msg);
  webContents?.getFocusedWebContents()?.send('main-process-message', msg);
};

export const processMessage = (info: string, current: number, total: number) => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_PROCESS, info, current, total);
};
