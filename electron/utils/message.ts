import { ipcMain, webContents } from 'electron';

export const sendMessage = (msg: string) => {
  webContents?.getFocusedWebContents()?.send('main-process-message', msg);
};
ipcMain.handle('sen-msg', (s, a) => {
  sendMessage(a);
});
