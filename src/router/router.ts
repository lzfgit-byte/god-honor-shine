import { createRouter, createWebHashHistory } from 'vue-router';
import type { App } from 'vue';

export const routes = [
  {
    path: '/',
    name: 'HWord',
    aliasZH: 'HentaiWord',
    showInMenu: true,
    component: () => import('@/feature/hentai-word/hw-home.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.map(({ path, name, component }) => ({ path, name, component })),
});
export default router;
export const registerRouter = (app: App) => {
  app.use(router);
};
