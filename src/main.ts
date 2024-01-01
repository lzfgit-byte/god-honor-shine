import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { NButton, NInput, NTag, create } from 'naive-ui';
import locale from 'element-plus/es/locale/lang/zh-cn'; // element中文
import ElementPlus from 'element-plus';
import App from '@/App.vue';
import 'animate.css';
import { registerRouter } from '@/router/router';
import 'element-plus/dist/index.css';
const pinia = createPinia();

const naive = create({
  components: [NButton, NInput, NTag],
});
const app = createApp(App);
app.use(pinia);
app.use(naive);
registerRouter(app);
app.use(ElementPlus, { locale }).mount('#app');
