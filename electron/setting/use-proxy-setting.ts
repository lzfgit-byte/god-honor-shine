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
  return `PROXY 127.0.0.1:10809`;
}

const doJob = async (win: BrowserWindow) => {
  const { proxy, needProxy, proxyHttp } = await useSystemSetting();
  const pacUrl = `data:video/mp2t;base64,${Buffer.from(FindProxyForURL.toString(), 'utf8').toString(
    'base64'
  )}`;
  console.log(FindProxyForURL.toString()?.replace('$proxyHttp', proxyHttp));
  console.log(pacUrl);
  console.log(pac);
  if (needProxy && proxy) {
    await win.webContents.session.setProxy({
      pacScript: pac,
    });
  }
};

export default (win: BrowserWindow) => {
  doJob(win).then(() => true);
};
