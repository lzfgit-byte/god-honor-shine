import { ipcRenderer } from 'electron';
import { MESSAGE_EVENT_KEY } from '@ghs/constant';
import type { MessageInfo } from '@ghs/types/src';
import { message } from 'ant-design-vue';
import bus from '@/utils/bus';
import { notify } from '@/utils/kit-utils';
// 执行后台的方法
export const executeFunction = async (funcName: string, ...args: any[]) => {
  return await ipcRenderer.invoke(funcName, ...args);
};
// 获取后台的消息
ipcRenderer.on(MESSAGE_EVENT_KEY.SEND_MESSAGE, (_event, args: MessageInfo) => {
  const { msg, type } = args;
  switch (type) {
    case 'success': {
      message.success(msg).then(() => 1);
      break;
    }
    case 'error': {
      message.error(msg).then(() => 1);
      break;
    }
    case 'info': {
      message.info(msg).then(() => 1);
      break;
    }
  }
});
// 播放进度信息
ipcRenderer.on(MESSAGE_EVENT_KEY.SEND_PROCESS_MESSAGE, (_event, args: MessageInfo) => {
  const { key, percentage } = args;
  bus.emit(key, percentage);
});
ipcRenderer.on(MESSAGE_EVENT_KEY.SEND_NOTIFY_MESSAGE, (_event, args: MessageInfo) => {
  const { key, title, msg } = args;
  notify(key, msg, title);
});
