import { ipcMain, webContents } from 'electron';

export const sendMessage = (msg: string, type: 'info' | 'waring' | 'error' = 'info') => {
  webContents?.getFocusedWebContents()?.send('send-message', msg, type);
};
ipcMain.handle('sen-msg', (s, a) => {
  sendMessage(a);
});
