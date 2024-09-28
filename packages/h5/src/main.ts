import { createApp } from 'vue';
import App from '@/App.vue';
import { Button, ConfigProvider, FloatingBubble } from 'vant';
import 'vant/lib/index.css';
import { registerRouter } from '@/router/router';
const app = createApp(App);

app.use(Button).use(ConfigProvider).use(FloatingBubble);

registerRouter(app);
app.mount('#app');
