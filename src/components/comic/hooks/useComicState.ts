import { ref } from 'vue';
import useGlobalState from '@/hooks/use-global-state';

export default (url: string) => {
  const containerRef = ref<HTMLDivElement>();
  const { webKey } = useGlobalState();
  return { containerRef };
};
