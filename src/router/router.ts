import { createRouter, createWebHashHistory } from 'vue-router';
import type { App } from 'vue';
export interface RouterType {
  path?: string;
  icon?: string;
  aliasZH?: string;
  force?: boolean;
  [T: string]: any;
}
export const routes: RouterType[] = [
  {
    path: '/',
    name: 'HWord',
    aliasZH: 'HentaiWord',
    showInMenu: true,
    component: () => import('@/feature/hentai-word/hw-home.vue'),
  },
  {
    path: '/hentai-word',
    name: 'hentai-word',
    aliasZH: 'HW',
    icon: 'https://thehentaiworld.com/favicon.ico',
    showInMenu: true,
    component: () => import('@/feature/hentai-word/hw-home.vue'),
  },
  {
    path: '/rule34',
    name: 'rule34',
    aliasZH: 'R34',
    icon: 'https://rule34video.com/favicon.ico',
    showInMenu: true,
    component: () => import('@/feature/rule34/rule-34.vue'),
  },
  {
    path: '/18-comic',
    name: '18Comic',
    aliasZH: '18C',
    icon: 'https://18comic.vip/favicon.ico',
    force: true,
    showInMenu: true,
    component: () => import('@/feature/18comic/18-comic.vue'),
  },
  {
    path: '/badnews',
    name: 'badnews',
    aliasZH: 'BAN',
    icon: 'https://bad.news/favicon.ico',
    showInMenu: true,
    component: () => import('@/feature/badnews/bad-news.vue'),
  },
  {
    path: '/lulu',
    name: 'lulu',
    aliasZH: 'lulu',
    icon: 'https://www.pornlulu.com/favicon.ico',
    showInMenu: true,
    component: () => import('@/feature/lulu/lulu-home.vue'),
  },
  {
    path: '/18-comic-reader',
    name: '18-comic-reader',
    aliasZH: '18C',
    showInMenu: true,
    component: () => import('@/feature/18comic/components/comic-reader.vue'),
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
