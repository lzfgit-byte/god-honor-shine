import { release } from 'node:os';
import { join } from 'node:path';
import { BrowserWindow, Menu, app, globalShortcut, ipcMain, shell } from 'electron';
import { sendMessage } from '../utils/message';
import useSetting from '../common/use-setting';
import useIpcMain from '../common/use-ipc-main';
import useService from '../common/use-service';
import useCookie from '../common/use-cookie';
import useChildWin from '../common/use-child-win';
import useGlobalShortcut from '../common/use-global-shortcut';

process.env.DIST_ELECTRON = join(__dirname, '..');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;
// 安全设置
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
app.commandLine.appendSwitch('disable-web-security');

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) {
  app.disableHardwareAcceleration();
}

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') {
  app.setAppUserModelId(app.getName());
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
// 启动服务
const closeServer = useService();
let win: BrowserWindow | null = null;

const preload = join(__dirname, '../preload/index.js');

const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    title: 'ghs',
    width: 1450,
    height: 788,
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  const { proxy, needProxy } = useSetting();
  if (needProxy && proxy) {
    win.webContents.session.setProxy({ proxyRules: proxy });
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  win.webContents.on('did-finish-load', () => {
    sendMessage('start done');
  });
  useGlobalShortcut();
  const closeChildWin = useChildWin(null);
  win.webContents.on('destroyed', () => {
    closeChildWin();
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
