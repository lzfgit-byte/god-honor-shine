import { webContents } from 'electron';
import type { MessageType, ProcessMsgType } from '@ghs/share';
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
 */
export const processMessage = (opts: ProcessMsgType) => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_PROCESS, opts);
};
