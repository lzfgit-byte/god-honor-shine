import { webContents } from 'electron';
export const emit2render = (event: string) => {
  webContents?.getFocusedWebContents()?.send('emit2render', event);
};
