import { createApp } from 'vue';
import App from './App.vue';
import './samples/node-api';
import 'ant-design-vue/dist/antd.css';
createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*');
  });
