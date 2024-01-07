import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { NButton, NInput, NTag, create } from 'naive-ui';
import App from '@/App.vue';
import 'animate.css';
import { registerRouter } from '@/router/router';
const pinia = createPinia();

const naive = create({
  components: [NButton, NInput, NTag],
});
const app = createApp(App);
app.use(pinia);
app.use(naive);
registerRouter(app);
app.mount('#app');
