import { webContents } from 'electron';
export const sendMessage = (msg: string) => {
  webContents?.getFocusedWebContents()?.send('main-process-message', msg);
};
