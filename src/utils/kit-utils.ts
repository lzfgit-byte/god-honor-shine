import pkg from '@/../package.json';
export const HTTP_SERVER_URL = `http://127.0.0.1:${pkg.servicePort}/`;
export const getImgUrl = (url: string) => `${HTTP_SERVER_URL}getImg?url=${url}`;

export const getVideoUrl = (url: string) => `${HTTP_SERVER_URL}getByte?url=${url}`;
