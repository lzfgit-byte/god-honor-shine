import { ref } from 'vue';
import type { WebConfig } from '@ghs/types';

const webKey = ref();
const webConfigs = ref<WebConfig[]>([]);

export default () => {
  return { webKey, webConfigs };
};
