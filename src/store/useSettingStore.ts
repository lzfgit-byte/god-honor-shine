import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SettingType } from '@/types/system-info';

export default defineStore('settings', () => {
  const settings = ref<SettingType[]>([{ icon: '', title: '设置', type: 'setting' }]);
  return { settings };
});
