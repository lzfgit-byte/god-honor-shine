import { webContents } from 'electron';
import { logger } from './logger';
/**
 * 发送消息
 * @param msg
 * @param type
 */
export const sendMessage = (msg: string, type: any) => {
  if (type === 'info') {
    logger.db_log(msg);
    // webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_MESSAGE, msg);
  }
};
/**
 * 发送进度信息
 */
export const processMessage = (opts) => {
  // webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_PROCESS, opts);
};
