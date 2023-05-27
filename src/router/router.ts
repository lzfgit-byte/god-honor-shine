import type { RouteRecord } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import type { App } from '@vue/runtime-core';

export type routerType = {
  path?: string;
  name?: string;
  aliasZH?: string;
  showInMenu?: boolean;
  icon?: string;
} & RouteRecord;
export const routes = [
  {
    path: '/',
    name: 'HWord',
    aliasZH: 'HentaiWord',
    showInMenu: true,
    component: () => import('@/feature/hentai-word/view/main-view.vue'),
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
