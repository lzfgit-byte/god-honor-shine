import { ipcRenderer } from 'electron';
import { SYS_GLOB_KEY } from '@ghs/share';
import bus from '@/utils/bus';
// 执行后台的方法
export const executeFunction = async (funcName: string, ...args: any[]) => {
  return await ipcRenderer.invoke(funcName, ...args);
};

// 获取后台的消息
ipcRenderer.on(SYS_GLOB_KEY.SEND_MESSAGE, (_event, ...args) => {
  bus.emit(SYS_GLOB_KEY.SEND_MESSAGE, args.join(' '));
});
