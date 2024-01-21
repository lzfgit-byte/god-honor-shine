import { webContents } from 'electron';
import type { MessageType } from '@ghs/share';
import { SYS_GLOB_KEY } from '@ghs/share';

/**
 * 发送消息
 * @param msg
 * @param type
 */
export const sendMessage = (msg: string, type: MessageType = 'info') => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_MESSAGE, msg, type);
};
/**
 * 发送进度信息
 * @param info
 * @param current
 * @param total
 */
export const processMessage = (info: string, current: number, total: number, id = '') => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_PROCESS, info, current, total, id);
};
