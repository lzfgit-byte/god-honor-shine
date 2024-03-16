import type { BrowserWindow } from 'electron';
import { sendMessage } from '../utils/message';
import useSystemSetting from './use-system-setting';
// @ts-ignore
import pac from './pac?url';
function FindProxyForURL(url, host) {
  let ignore = ['bobolj.com'];
  for (let i = 0; i < ignore.length; i++) {
    if (url.indexOf(ignore[i]) > -1) {
      return 'DIRECT';
    }
  }
  return `PROXY $proxyHttp`;
}

const pacScript = (proxyHttp: string) =>
  `data:video/mp2t;base64,${Buffer.from(
    FindProxyForURL.toString()?.replace('$proxyHttp', proxyHttp),
    'utf8'
  ).toString('base64')}`;

const doJob = async (win: BrowserWindow) => {
  const { proxy, needProxy, proxyHttp } = await useSystemSetting();
  if (needProxy && proxy) {
    await win.webContents.session.setProxy({
      pacScript: pacScript(proxyHttp),
    });
  }
};

export default (win: BrowserWindow) => {
  doJob(win).then(() => true);
};
