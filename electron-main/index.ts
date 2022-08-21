// @ts-ignore
import path from 'path';
import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
import fs from 'fs-extra';

let win: BrowserWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.commandLine.appendSwitch('disable-web-security');

const setFile = process.cwd() + '/config.json';

export const getSetting = (key) => {
  const res = String(fs.readFileSync(setFile));
  const set = JSON.parse(res);
  return set[key];
};

function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1470,
    height: 788,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, '../electron-preload/index.js'),
    },
  });
  const proxy = getSetting('proxy');
  if (getSetting('needProxy') && proxy) {
    win.webContents.session.setProxy({ proxyRules: proxy });
  }
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', '主进程发送消息了');
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../index.html'));
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;
    win.loadURL(url);
    win.webContents.openDevTools();
  }
  globalShortcut.register('ctrl+shift+alt+e', function () {
    let win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.webContents.openDevTools();
    }
  });
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(createWindow);
