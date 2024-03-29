import type { T_config } from '@ghs/share';
import { SYSTEM_SET_KEY, T_config_init } from '@ghs/share';
import { TableBuilder, currentVersion } from '../database/init-db';
const initData: T_config[] = [
  { name: 'proxy', value: 'socks5://127.0.0.1:10808', flag: '1' },
  { name: 'proxyHttp', value: '127.0.0.1:10809', flag: '1' },
  { name: 'proxyWhitelist', value: '"bobolj.com"', flag: '1' },
  { name: 'needProxy', value: 'true', flag: '1' },
  { name: 'imgWinMin', value: '5', flag: '1' },
  { name: 'imgWinMax', value: '10', flag: '1' },
  { name: 'version', value: `${currentVersion}`, flag: '1' },
];
let get = () => {
  const table = new TableBuilder<T_config>(T_config_init);
  if (!table.isTableExist()) {
    // 不存在
    table.createTable(initData);
  } else {
    const data = table.getByField('name', 'version');
    if (+data?.value >= currentVersion) {
      get = () => table;
      return table;
    }
    table.dropTable();
    table.createTable(initData);
  }
  get = () => table;
  return table;
};
export default () => get();
