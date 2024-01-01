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
  {
    path: '/18Comic',
    name: '18Comic',
    aliasZH: '18Comic',
    showInMenu: true,
    component: () => import('@/feature/18-comic/view/18-comic-main.vue'),
  },
  {
    path: '/rule34',
    name: 'rule34',
    aliasZH: 'rule34',
    showInMenu: true,
    component: () => import('@/feature/rule34/view/rule34-main.vue'),
  },
  {
    path: '/badNews',
    name: 'badNews',
    aliasZH: 'badNews',
    showInMenu: true,
    component: () => import('@/feature/bad-news/view/bad-news-main-view.vue'),
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
