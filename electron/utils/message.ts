import { webContents } from 'electron';
import type { MessageType, ProcessMsgType } from '@ghs/share';
import { SYS_GLOB_KEY } from '@ghs/share';
import { logger } from './logger';
/**
 * 发送消息
 * @param msg
 * @param type
 */
export const sendMessage = (msg: string, type: MessageType = 'info') => {
  if (type === 'info') {
    logger.db_log(msg);
    webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_MESSAGE, msg);
  }
};
/**
 * 发送进度信息
 */
export const processMessage = (opts: ProcessMsgType) => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_PROCESS, opts);
};
