import { queryConfigByKey } from '../database/table-config';
import { SYSTEM_SET_KEY } from '../const/system';
interface optsType {
  proxy: string;
  needProxy: boolean;
}
let GetSet = async (): Promise<optsType> => {
  const proxy = await queryConfigByKey(SYSTEM_SET_KEY.proxy);
  const needProxy = await queryConfigByKey(SYSTEM_SET_KEY.needProxy);
  const set = { proxy: proxy.value, needProxy: needProxy.value === 'true' };
  GetSet = async (): Promise<optsType> => Promise.resolve(set);
  return GetSet();
};
export default async (): Promise<optsType> => await GetSet();
