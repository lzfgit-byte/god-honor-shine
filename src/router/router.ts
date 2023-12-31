import { createRouter, createWebHashHistory } from 'vue-router';
import type { App } from '@vue/runtime-core';

export const routes = [
  {
    path: '/',
    name: 'HWord',
    chinese: 'HentaiWord',
    icon: '',
    showInMenu: true,
    component: () => import('@/views/main-page.vue'),
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
