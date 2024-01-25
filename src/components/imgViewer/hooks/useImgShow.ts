import { ref } from 'vue-demi';
import type { HWImgInfo } from '@ghs/share';
import type { Ref } from 'vue';
import { computed } from 'vue';

export default (transX: Ref<number>, transY: Ref<number>, scale: Ref<number>) => {
  const images = ref<HWImgInfo[]>([]);
  const current = ref(0);
  const showCurrent = computed(() => current.value + 1);
  const visible = ref(false);
  const choseUrl = ref<'fullUrl' | 'minUrl'>('minUrl');
  const imgUrl = computed(() =>
    images.value.length > 0 ? images.value[current.value][choseUrl.value] : ''
  );
  const preloadUrl = computed(() => {
    const allImgLength = images.value.length;
    const executeCacheLength = +(allImgLength / 4).toFixed(0);
    const cacheLength = executeCacheLength ? Math.min(3, executeCacheLength) : 0;
    if (!cacheLength) {
      return [];
    }
    const afterRes = [];
    let currentNor = current.value;
    while (+cacheLength > 0 && currentNor < allImgLength - 1 && afterRes.length < cacheLength) {
      afterRes.push(images.value[++currentNor].minUrl);
    }
    // 前边的
    const beforeRes = [];
    let currentNorBefore = current.value;
    while (+cacheLength > 0 && currentNorBefore > 0 && beforeRes.length < cacheLength) {
      beforeRes.push(images.value[--currentNorBefore].minUrl);
    }
    if (beforeRes.length < +cacheLength) {
      let c = +cacheLength - beforeRes.length;
      while (c >= 1 && beforeRes.length < cacheLength) {
        beforeRes.push(images.value[allImgLength - c].minUrl);
        c--;
      }
    }
    return [...afterRes, ...beforeRes];
  });
  const beforeChange = () => {
    choseUrl.value = 'minUrl';
    transX.value = 0;
    transY.value = 0;
    scale.value = 100;
  };
  const preImg = () => {
    if (images.value.length === 1) {
      return;
    }
    beforeChange();
    if (current.value > 0) {
      current.value--;
    } else {
      current.value = images.value.length - 1;
    }
  };
  const nextImg = () => {
    if (images.value.length === 1) {
      return;
    }
    beforeChange();
    if (current.value < images.value.length - 1) {
      current.value++;
    } else {
      current.value = 0;
    }
  };
  const handleBackClick = (evt: PointerEvent) => {
    const el = evt.target as HTMLDivElement;
    if (el.classList.contains('ghsiv-body')) {
      visible.value = false;
    }
  };
  return {
    showCurrent,
    visible,
    imgUrl,
    preImg,
    nextImg,
    images,
    choseUrl,
    current,
    handleBackClick,
    preloadUrl,
  };
};
