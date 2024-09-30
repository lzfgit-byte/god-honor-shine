import { createApp } from 'vue';
import {
  Button,
  ConfigProvider,
  Dialog,
  FloatingBubble,
  Icon,
  Loading,
  Notify,
  Tabbar,
  TabbarItem,
} from 'vant';
import App from '@/App.vue';
import 'animate.css';
import 'vant/lib/index.css';
import 'virtual:uno.css';
import { registerRouter } from '@/router/router';
const app = createApp(App);

app
  .use(Button)
  .use(ConfigProvider)
  .use(FloatingBubble)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Notify)
  .use(Dialog)
  .use(Loading);

registerRouter(app);
app.mount('#app');
