import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WebAppType_F } from '@/types/system-info';

export default defineStore('apps', () => {
  const apps = ref<WebAppType_F[]>([]);
  const setApps = (apps_: WebAppType_F[]) => {
    apps.value.length = 0;
    apps.value.push(...apps_);
  };
  return { apps, setApps };
});
