import { createApp } from 'vue';
import locale from 'element-plus/lib/locale/lang/zh-cn'; // element中文
import ElementPlus from 'element-plus';
import App from '@/App.vue';
import '@/samples/node-api';

import { registerRouter } from '@/router/router';

const app = createApp(App);
registerRouter(app);
app.use(ElementPlus, { locale }).mount('#app');
// 可以给 preload 进程发消息
// postMessage({ payload: 'removeLoading' }, '*')
