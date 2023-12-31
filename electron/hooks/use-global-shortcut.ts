import { BrowserWindow, globalShortcut } from 'electron';

export default (win: BrowserWindow) => {
  globalShortcut.register('ctrl+shift+alt+e', function () {
    let win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.webContents.openDevTools();
    }
  });
};
