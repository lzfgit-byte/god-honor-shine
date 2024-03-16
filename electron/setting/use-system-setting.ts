import { SYSTEM_SET_KEY } from '@ghs/share';
import initSettingDb from './init-setting-db';

interface optsType {
  proxy: string;
  proxyHttp: string;
  needProxy: boolean;
  imgWinMin: number;
  imgWinMax: number;
}
let GetSet = async (): Promise<optsType> => {
  const table = initSettingDb();
  const getValue = (key: string) => table.getByField('name', key)?.value;
  const set = {
    proxy: getValue(SYSTEM_SET_KEY.proxy),
    proxyHttp: getValue(SYSTEM_SET_KEY.proxyHttp),
    needProxy: getValue(SYSTEM_SET_KEY.needProxy) === 'true',
    imgWinMin: +getValue(SYSTEM_SET_KEY.imgWinMin) || 5,
    imgWinMax: +getValue(SYSTEM_SET_KEY.imgWinMax) || 10,
  };
  GetSet = async (): Promise<optsType> => Promise.resolve(set);
  return GetSet();
};
export default async (): Promise<optsType> => await GetSet();
