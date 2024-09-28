import axios from 'axios';

const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // 假设服务器返回的数据结构是 { code: number, data: any, message: string }
      const { code, data, message } = response.data;
      if (code !== 200) {
        return Promise.reject(new Error(message));
      }
      return data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 封装 get 请求
export const get = (url: string, params = {}) => {
  return instance.get(url, {
    params: params,
  });
};

// 封装 post 请求
export const post = (url: string, data = {}) => {
  return instance.post(url, data);
};

// 导出实例
export default instance;
