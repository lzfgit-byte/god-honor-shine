import { webContents } from 'electron';
import { SYS_GLOB_KEY } from '@ghs/share';

export const sendMessage = (
  msg: string,
  type: 'info' | 'waring' | 'error' | 'success' = 'info',
  id?: string
) => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_MESSAGE, msg, type);
};
export const processMessage = (info: string, current: number, total: number) => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_PROCESS, info, current, total);
};
