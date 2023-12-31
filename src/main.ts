import { createApp } from 'vue';
import locale from 'element-plus/es/locale/lang/zh-cn'; // element中文
import ElementPlus from 'element-plus';
import App from '@/App.vue';
import 'element-plus/dist/index.css';

import { registerRouter } from '@/router/router';

const app = createApp(App);
registerRouter(app);
app.use(ElementPlus, { locale }).mount('#app');
// 可以给 preload 进程发消息
// postMessage({ payload: 'removeLoading' }, '*')
