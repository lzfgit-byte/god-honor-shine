import { queryConfigByKey } from '../database/table-config';
import { SYSTEM_SET_KEY } from '../const/system';
interface optsType {
  proxy: string;
  needProxy: boolean;
  imgWinMin: number;
  imgWinMax: number;
}
let GetSet = async (): Promise<optsType> => {
  const proxy = await queryConfigByKey(SYSTEM_SET_KEY.proxy);
  const needProxy = await queryConfigByKey(SYSTEM_SET_KEY.needProxy);
  const imgWinMin = await queryConfigByKey(SYSTEM_SET_KEY.imgWinMin);
  const imgWinMax = await queryConfigByKey(SYSTEM_SET_KEY.imgWinMax);

  const set = {
    proxy: proxy.value,
    needProxy: needProxy.value === 'true',
    imgWinMin: +imgWinMin?.value || 5,
    imgWinMax: +imgWinMax?.value || 10,
  };
  GetSet = async (): Promise<optsType> => Promise.resolve(set);
  return GetSet();
};
export default async (): Promise<optsType> => await GetSet();
