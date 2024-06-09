import type { BrowserWindow } from 'electron';
import { globalShortcut } from 'electron';

export default (win: BrowserWindow) => {
  // globalShortcut.register(SYSTEM_SHORT_CUT.openDevTools, function () {
  //   let win = BrowserWindow.getFocusedWindow();
  //   if (win) {
  //     win.webContents.openDevTools();
  //   }
  // });
};
