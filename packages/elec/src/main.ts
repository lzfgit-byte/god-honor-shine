import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import 'animate.css';
import { registerRouter } from '@/router/router';
const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
registerRouter(app);
app.mount('#app');
