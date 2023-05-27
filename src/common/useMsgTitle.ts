import { useTitle } from '@vueuse/core';
import { computed, ref } from 'vue';
import bus from '@/utils/bus';

const messages = ref<any>('');
const title = computed(() => {
  return !messages.value ? 'ghs' : `ghs [${messages.value}] `;
});
bus.on('msg-main', (msg) => {
  messages.value = msg;
});
export default () => {
  useTitle(title);
};
