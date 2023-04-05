import { webContents } from 'electron';
const content = null;
const getContent = () => {
  webContents?.getFocusedWebContents();
};
export const sendMessage = (msg: string) => {
  // ipcMain
  webContents?.getFocusedWebContents()?.send('main-process-message', msg);
};
