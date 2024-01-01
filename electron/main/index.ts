import { join } from 'node:path';
import { BrowserWindow, app, shell } from 'electron';
import { sendMessage } from '../utils/message';
import useIpcMain from '../common/use-ipc-main';
import useService from '../common/use-service';
import useCookie from '../common/use-cookie';
import useChildWin from '../common/use-child-win';
import useGlobalShortcut from '../common/use-global-shortcut';
import useChildWinPic from '../utils/use-child-win-pic';
import useWinProxy from '../hook/useWinProxy';
import { resolvePreload, resolvePublic } from '../utils/KitUtil';
import { init } from './init/init-evt';
init();
// 启动服务
const closeServer = useService();
let win: BrowserWindow | null = null;

const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
  win = new BrowserWindow({
    title: 'ghs',
    width: 1450,
    height: 788,
    icon: resolvePublic('favicon.ico'),
    webPreferences: {
      preload: resolvePreload('index'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  useWinProxy(win);
  if (process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    await win.loadFile(indexHtml);
  }

  win.webContents.on('did-finish-load', () => {
    sendMessage('start done');
  });
  useGlobalShortcut();
  const closeChildWin = useChildWin(null);
  const picClose = useChildWinPic(win);
  win.webContents.on('destroyed', () => {
    closeServer();
    closeChildWin();
    picClose();
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  win = null;
  closeServer();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// 注册远程方法
useIpcMain();
useCookie();
