import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { cached, hasCache } from '@/utils/cache';
import { getSetting } from '@/utils/setting';

const proxy = getSetting('proxy');
axios.defaults.timeout = 20000;
axios.interceptors.request.use((con) => {
  return con;
});
axios.interceptors.response.use((res) => {
  if (res.data instanceof String || res.data instanceof Buffer) cached(res.config.url, res.data);
  return res.data;
});
if (proxy && getSetting('needProxy')) {
  const agent = new SocksProxyAgent('socks://127.0.0.1:10808');
  axios.defaults.httpsAgent = agent;
  axios.defaults.httpAgent = agent;
}
const header: any = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36',
  'Access-Control-Allow-Origin': '*',
};
axios.defaults.headers = header;
export const getHtmlAxios = async (url) => {
  return await hasCache(url)
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch(() => {
      return axios.get(url);
    });
};

export const getImg = async (url) => {
  return await hasCache(url)
    .then((res) => {
      return Promise.resolve(url);
    })
    .catch(() => {
      return axios.get(url, { responseType: 'arraybuffer' });
    });
};
export const loadImg = (url) => {
  hasCache(url).catch(() => {
    return axios.get(url, { responseType: 'arraybuffer' });
  });
};
export const axiosGet = (url, options) => {
  return axios.get(url, { params: options });
};
export const axiosPost = (url, options) => {
  return axios.post(url, { params: options });
};
