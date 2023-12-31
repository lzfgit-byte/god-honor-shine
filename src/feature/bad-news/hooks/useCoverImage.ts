import { computed, ref } from 'vue';

export default () => {
  const imgRef = ref<HTMLImageElement>();
  const imageWidth = ref(150);
  const imageHeight = ref(150);
  const containerWidth = ref(150);
  const containerWidthComp = computed(() => `${containerWidth.value}px`);
  const handlerLoad = () => {
    const width = imgRef.value?.naturalWidth || 0;
    const height = imgRef.value?.naturalHeight || 0;
    imageHeight.value = 150;
    imageWidth.value = 150 * (width / height);
  };
  return { handlerLoad, imgRef, imageWidth, imageHeight, containerWidthComp };
};
