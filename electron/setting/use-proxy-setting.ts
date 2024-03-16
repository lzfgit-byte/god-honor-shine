import type { BrowserWindow } from 'electron';
import { sendMessage } from '../utils/message';
import useSystemSetting from './use-system-setting';
// @ts-ignore
import pac from './pac?url';
const pacScript = (proxyHttp: string) =>
  `data:text/plain;base64,${Buffer.from(
    FindProxyForURL.toString()?.replace('$proxyHttp', proxyHttp),
    'utf8'
  ).toString('base64')}`;
const doJob = async (win: BrowserWindow) => {
  const { proxy, needProxy, proxyHttp } = await useSystemSetting();
  if (needProxy && proxy) {
    await win.webContents.session.setProxy({
      pacScript: pac,
    });
  }
};

export default (win: BrowserWindow) => {
  doJob(win).then(() => true);
};
