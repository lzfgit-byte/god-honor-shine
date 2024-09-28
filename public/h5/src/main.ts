import { createApp } from 'vue';
import App from '@/App.vue';
import { Button, ConfigProvider } from 'vant';
import 'vant/lib/index.css';
import { registerRouter } from '@/router/router';
const app = createApp(App);

app.use(Button).use(ConfigProvider);

registerRouter(app);
app.mount('#app');
