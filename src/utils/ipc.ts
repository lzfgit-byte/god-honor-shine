import { ipcRenderer } from 'electron';
import bus from '@/utils/bus';
import { SYS_F_GLOB_KEY } from '@/const/system';

export const executeFunction = async (funcName: string, ...args: any[]) => {
  return await ipcRenderer.invoke(funcName, ...args);
};

ipcRenderer.on(SYS_F_GLOB_KEY.SEND_MESSAGE, (_event, ...args) => {
  bus.emit(SYS_F_GLOB_KEY.SEND_MESSAGE, args.join(' '));
});
