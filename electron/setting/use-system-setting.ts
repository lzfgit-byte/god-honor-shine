import type { SystemSetting } from '@ghs/types';
import { keys } from 'lodash';
import { ConfigEntity } from '../database/config-table';
const defaultSetting: SystemSetting = {
  proxyHttp: '127.0.0.1:10809',
  proxySocks5: 'socks5://127.0.0.1:10808',
  imgWinMax: 10,
  imgWinMin: 5,
  dbVersion: 1,
  proxyWhitelist: '"bobolj.com","lbbf9.com","video.huishenghuo888888.com","v.ykv3.com"',
};
let lock = false;
const init = async () => {
  if (lock) {
    return;
  }
  lock = true;
  const [list, count] = await ConfigEntity.findAndCount();
  const keysList = keys(defaultSetting);
  if (count !== keysList.length) {
    const entityS = [];
    keysList.forEach((key) => {
      const fs = list.find((item) => item.name === key);
      if (!fs) {
        const config = new ConfigEntity();
        config.name = key;
        config.value = defaultSetting[key];
        config.createTime = new Date();
        entityS.push(config);
      }
    });
    await ConfigEntity.save(entityS);
  }
};

export default async (): Promise<SystemSetting> => {
  await init();
  return defaultSetting;
};
