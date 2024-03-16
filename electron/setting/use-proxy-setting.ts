import type { BrowserWindow } from 'electron';
import useSystemSetting from './use-system-setting';
function dnsDomainIs(host, com: string) {
  return false;
}
function FindProxyForURL(url, host) {
  if (dnsDomainIs(host, 'baidu.com')) {
    return 'DIRECT';
  }
  return `PROXY $proxyHttp`;
}
const pacScript = (proxyHttp: string) =>
  `data:text/plain;base64,${Buffer.from(
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
