import { webContents } from 'electron';
import { MESSAGE_EVENT_KEY } from '@ghs/constant';
import type { MessageInfo } from '@ghs/types';
import { logger } from './logger';
// export const sendMessage = (msg: MessageInfo) => {
//   webContents?.getFocusedWebContents()?.send(MESSAGE_EVENT_KEY.SEND_MESSAGE, msg);
// };
export class MessageUtil {
  static info(msg: string) {
    this.sendMsg({ type: 'info', msg });
  }

  static error(msg: string) {
    this.sendMsg({ type: 'error', msg });
  }

  static success(msg: string) {
    this.sendMsg({ type: 'success', msg });
  }

  static warning(msg: string) {
    this.sendMsg({ type: 'warning', msg });
  }

  static sendMsg(msg: MessageInfo) {
    webContents?.getFocusedWebContents()?.send(MESSAGE_EVENT_KEY.SEND_MESSAGE, msg);
  }
}
/**
 * 发送进度信息
 */
export const processMessage = (opts) => {
  webContents?.getFocusedWebContents()?.send(MESSAGE_EVENT_KEY.SEND_PROCESS_MESSAGE, opts);
};
