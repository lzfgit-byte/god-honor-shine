import { ref } from 'vue';

export default (url: string) => {
  const containerRef = ref<HTMLDivElement>();
  return { containerRef };
};
