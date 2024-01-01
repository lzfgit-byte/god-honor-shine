import type { BrowserWindow } from 'electron';
import useSetting from '../common/use-setting';

export default (win: BrowserWindow) => {
  const { proxy, needProxy } = useSetting();
  if (needProxy && proxy) {
    win.webContents.session.setProxy({ proxyRules: proxy });
  }
};
