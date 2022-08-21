import { exportFunc } from '@/utils/ipc';
const {
  getHtmlAxios,
  getImgBase64,
  getHtmlInfo,
  getVideoInfo,
  getImgInfo,
  getImgInfoOnly,
  deleteFile,
  clearCache,
  loadImgFile,
  getImgBase64FromDisk,
  getCacheDir,
} = exportFunc;
export const getHentaiWordFunc = (inject?: any) => {
  return {
    getHtmlAxios,
    getImgBase64,
    getHtmlInfo: getHtmlInfo,
    getVideoInfo: getVideoInfo,
    getImgInfo: getImgInfo,
    getImgInfoOnly: getImgInfoOnly,
    removeCache: deleteFile,
    removeCacheAll: clearCache,
    loadImgFile,
    getImgBase64FromDisk,
    getCacheDir,
  };
};
