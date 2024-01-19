import { BrowserWindow, globalShortcut } from 'electron';
import { SYSTEM_SHORT_CUT } from '../const/system';

export default (win: BrowserWindow) => {
  globalShortcut.register(SYSTEM_SHORT_CUT.openDevTools, function () {
    let win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.webContents.openDevTools();
    }
  });
};
