import { webContents } from 'electron';
import { MESSAGE_EVENT_KEY } from '@ghs/constant';
import type { MessageInfo } from '@ghs/types';
import { type WebsocketMessageCategory, sendWebsocketMessage } from '../server/websocket';
import { eventEmitter, getCurrentDate } from './KitUtil';

const sendMessage = (eventKey: string, msg: MessageInfo, category: WebsocketMessageCategory) => {
  webContents?.getFocusedWebContents()?.send(eventKey, msg);
  sendWebsocketMessage(category, msg);
};

/**
 * 发送及时的消息
 */
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

  private static sendMsg(msg: MessageInfo) {
    sendMessage(MESSAGE_EVENT_KEY.SEND_MESSAGE, msg, 'message');
  }
}

/**
 * 发送步骤信息
 */
export class StepMessageUtil {
  static key: 'step_msg_key';
  private static sendMsg(msg: MessageInfo) {
    const data = { ...msg, key: StepMessageUtil.key };
    sendMessage(MESSAGE_EVENT_KEY.SEND_STEP_MESSAGE, data, 'step');
  }

  static sendStepMsg(title: string, msg: string, key: string) {
    this.sendMsg({ msg, title, key });
  }

  static closeStepMsg(title: string, msg: string, key: string) {
    this.sendMsg({ msg, title, key, close: true });
  }
}

/**
 *发送侧边信息
 */
export class NotifyMsgUtil {
  private static sendMsg(msg: MessageInfo) {
    sendMessage(MESSAGE_EVENT_KEY.SEND_NOTIFY_MESSAGE, msg, 'notify');
  }

  static sendNotifyMsg(title: string, msg: string, key: string) {
    this.sendMsg({ msg, title, key });
  }

  static close(key: string) {
    this.sendMsg({ close: true, key, msg: 'done', title: 'done' });
  }
}

/**
 *发送一时的日志信息
 */
export class LogMsgUtil {
  private static sendMsg(msg: MessageInfo) {
    sendMessage(MESSAGE_EVENT_KEY.SEND_LOG_MESSAGE, msg, 'log');
  }

  static sendLogMsg(...msg: string[]) {
    this.sendMsg({ msg: `${getCurrentDate()} ${msg.join(' ')}` });
  }

  static close() {
    this.sendMsg({ close: true });
  }
}

/**
 * 发送进度信息
 */
export class ProgressMsgUtil {
  private static sendMsg(msg: MessageInfo) {
    sendMessage(MESSAGE_EVENT_KEY.SEND_PROCESS_MESSAGE, msg, 'progress');
  }

  static sendProgressMsg(msg: MessageInfo) {
    this.sendMsg(msg);
  }

  static sendProgress(percentage: number, key: string, title?: string, msg?: string) {
    this.sendMsg({ percentage, key, title, msg });
  }

  static close(key: string) {
    this.sendMsg({ percentage: 100, close: true, key });
  }
}

/**
 *控制台设置日志
 */
export class ConsoleLogUtil {
  private static sendMsg(msg: MessageInfo) {
    sendMessage(MESSAGE_EVENT_KEY.SEND_CONSOLE_LOG, msg, 'console');
  }

  static sendLogMsg(...msg: string[]) {
    this.sendMsg({ msg: `${getCurrentDate()} ${msg.join(' ')}` });
  }
}

export const useGlobalMessage = () => {
  eventEmitter.on(MESSAGE_EVENT_KEY.SEND_LOG_MESSAGE, (msg) => {
    LogMsgUtil.sendLogMsg(msg);
  });
};
