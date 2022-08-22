import { exportFunc } from '@/utils/ipc';

export const comicFunc = (inject?: any) => {
  const getHomeInfo = exportFunc['getHomeInfo'];
  const getComicDetailInfo = exportFunc['getComicDetailInfo'];
  const getReaderInfos = exportFunc['getReaderInfos'];
  const getImgBase64FromDisk = exportFunc['getImgBase64FromDisk'];
  const removeCache: any = exportFunc['deleteFile'];
  const removeCacheAll: any = exportFunc['clearCache'];
  const getSearchInfo: any = exportFunc['getSearchInfo'];
  return {
    getHomeInfo,
    getComicDetailInfo,
    getReaderInfos,
    getImgBase64FromDisk,
    removeCache,
    removeCacheAll,
    getSearchInfo,
  };
};
export type httpFunc = (url: string, option: Record<string, any>) => Promise<any>;
export const httpFunc = (inject?: any) => {
  const axiosGet: httpFunc = exportFunc['axiosGet'];
  const axiosPost: httpFunc = exportFunc['axiosPost'];
  const getHtmlByNet: (url: string) => Promise<string> = exportFunc['getHtmlByNet'];
  const getBlob: (url: string) => Promise<Blob> = exportFunc['getBlob'];

  return {
    axiosGet,
    axiosPost,
    getHtmlByNet,
    getBlob,
  };
};
export const getSettingFunc = (inject?: any) => {
  const getSetting: (key: string) => any = exportFunc['getSetting'];
  const setSetting: (key: string, value: any) => void = exportFunc['setSetting'];
  return {
    getSetting,
    setSetting,
  };
};

export default {};
