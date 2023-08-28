import { ipcMain, webContents } from 'electron';
import { logger } from './logger';

export const sendMessage = (msg: string) => {
  logger.log(msg);
  webContents?.getFocusedWebContents()?.send('main-process-message', msg);
};
ipcMain.handle('sen-msg', (s, a) => {
  sendMessage(a);
});
