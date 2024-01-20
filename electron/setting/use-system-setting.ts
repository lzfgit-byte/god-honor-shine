import { SYSTEM_SET_KEY } from '@ghs/share';
interface optsType {
  proxy: string;
  needProxy: boolean;
  imgWinMin: number;
  imgWinMax: number;
}
let GetSet = async (): Promise<optsType> => {
  const set = {
    proxy: 'socks5://127.0.0.1:10808',
    needProxy: true,
    imgWinMin: 5,
    imgWinMax: 10,
  };
  GetSet = async (): Promise<optsType> => Promise.resolve(set);
  return GetSet();
};
export default async (): Promise<optsType> => await GetSet();
