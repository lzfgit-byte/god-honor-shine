import { createRouter, createWebHashHistory } from 'vue-router';
import type { App } from 'vue';
import type { BaseConfig } from '@ghs/types';
import { ref } from 'vue';
import { f_listAllWebConfigs } from '@/utils/business';
export interface RouterType {
  path?: string;
  icon?: string;
  aliasZH?: string;
  force?: boolean;
  [T: string]: any;
}
export const routes = ref<RouterType[]>([]);
export const staticRoutes: RouterType[] = [
  {
    path: '/18-comic-reader',
    name: '18-comic-reader',
    aliasZH: '18C',
    showInMenu: true,
    component: () => import('@/components/comic-reader.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes.map(({ path, name, component }) => ({ path, name, component })),
});

export default router;
export const registerRouter = async (app: App) => {
  const webConfigs: BaseConfig[] = await f_listAllWebConfigs();
  webConfigs.forEach((item) => {
    router.addRoute({
      path: `/${item.key}`,
      name: item.name,
      component: () => import('@/view/comic-reader.vue'),
    });
  });

  app.use(router);
};
