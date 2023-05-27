import { createApp } from 'vue';
import App from '@/App.vue';
import '@/samples/node-api';
import { registerRouter } from '@/router/router';

const app = createApp(App);
registerRouter(app);
app.mount('#app');
// 可以给 preload 进程发消息
// postMessage({ payload: 'removeLoading' }, '*')
