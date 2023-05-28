const HTTP_SERVER_URL = 'http://127.0.0.1:3356/';
export const getImgUrl = (url: string) => `${HTTP_SERVER_URL}getImg?url=${url}`;

export const getVideoUrl = (url: string) => `${HTTP_SERVER_URL}getByte?url=${url}`;
