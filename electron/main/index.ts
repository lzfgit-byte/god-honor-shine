import { join } from 'node:path';
import { BrowserWindow, Menu, app, shell } from 'electron';
import { sendMessage } from '../utils/message';
import useIpcMain from '../hooks/use-ipc-main';
import useCookie from '../hooks/use-cookie';
import useGlobalShortcut from '../hooks/use-global-shortcut';
import './init/init-env';
import { resolvePreload, resolvePublic } from '../utils/KitUtil';
import useHandleMainEvent from './event/use-handle-main-event';

// 启动服务
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
  if (process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    await win.loadFile(indexHtml);
  }
  useHandleMainEvent(win);
  useGlobalShortcut(win);
}

app.whenReady().then(createWindow);
/**
 *窗口跟app是不一样的，这说明可以在无窗口时，可以再次创建窗口
 */
app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
/**
 *两个实例，想要再次隐形
 */
app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) {
      // 重新恢复
      win.restore();
    }
    win.focus();
  }
});
/**
 * 在应用变为活动时触发，展示第一个窗口
 */
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
