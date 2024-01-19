import { getImgBase64, requestHtml, requestHtmlByWin, requestImage } from '../http';

/**
 * 默认使用electron的request
 * @param url
 */
export const getImageBase64 = (url: string) => {
  return requestImage(url);
};

export const getHtml = (url: string) => {
  return requestHtml(url);
};
