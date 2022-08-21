import { solveName, solvePath } from '@/utils/urls';
import { getImg, loadImg } from './http';
import base64 from 'base64-img';

export const getImgBase64 = async (url) => {
  return await getImg(encodeURI(url)).then(() => {
    return Promise.resolve(base64.base64Sync(solvePath(solveName(url))));
  });
};
export const getImgBase64FromDisk = (url) => {
  return base64.base64Sync(solvePath(solveName(url)));
};
export const loadImgFile = async (url) => {
  loadImg(url);
};
