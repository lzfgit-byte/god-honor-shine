import { webContents } from 'electron';
import { SYS_GLOB_KEY } from '../const/system';

export const sendMessage = (
  msg: string,
  type: 'info' | 'waring' | 'error' | 'success' = 'info'
) => {
  webContents?.getFocusedWebContents()?.send(SYS_GLOB_KEY.SEND_MESSAGE, msg, type);
};
