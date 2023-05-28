import { webContents } from 'electron';
export const emit2render = (event: string, ...args) => {
  webContents?.getFocusedWebContents()?.send('emit2render', event, ...args);
};
