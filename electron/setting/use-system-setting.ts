import type { SystemSetting } from '@ghs/types';
const defaultSetting: SystemSetting = {
  proxyHttp: '127.0.0.1:10809',
  proxySocks5: 'socks5://127.0.0.1:10808',
  imgWinMax: 10,
  imgWinMin: 5,
  dbVersion: 1,
  proxyWhitelist: '"bobolj.com","lbbf9.com","video.huishenghuo888888.com","v.ykv3.com"',
};

export default (): SystemSetting => {
  return defaultSetting;
};
