import type { BrowserWindow } from 'electron';
import useSystemSetting from './use-system-setting';

export default async (win: BrowserWindow) => {
  const { proxy, needProxy } = await useSystemSetting();
  if (needProxy && proxy) {
    await win.webContents.session.setProxy({ proxyRules: proxy });
  }
};
