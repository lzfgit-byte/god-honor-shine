import { webContents } from 'electron';
import { MESSAGE_EVENT_KEY } from '@ghs/constant';
import type { MessageInfo } from '@ghs/types';
import { logger } from './logger';
/**
 * 发送消息
 * @param msg
 * @param type
 */
export const sendMessage = (msg: string) => {
  webContents?.getFocusedWebContents()?.send(MESSAGE_EVENT_KEY.SEND_MESSAGE, msg);
};
/**
 * 发送进度信息
 */
export const processMessage = (opts) => {
  webContents?.getFocusedWebContents()?.send(MESSAGE_EVENT_KEY.SEND_PROCESS_MESSAGE, opts);
};
