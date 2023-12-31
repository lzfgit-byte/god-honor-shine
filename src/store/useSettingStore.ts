import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RefreshOutline, SettingsOutline } from '@vicons/ionicons5';
import type { SettingType } from '@/types/system-info';

export default defineStore('settings', () => {
  const settings = ref<SettingType[]>([
    { icon: RefreshOutline, title: '刷新', type: 'refresh' },
    { icon: SettingsOutline, title: '设置', type: 'setting' },
  ]);
  return { settings };
});
