import { ref } from 'vue-demi';
import type { HWImgInfo } from '@ghs/share';
import type { Ref } from 'vue';
import { computed } from 'vue';

export default (transX: Ref<number>, transY: Ref<number>) => {
  const images = ref<HWImgInfo[]>([]);
  const current = ref(0);
  const showCurrent = computed(() => current.value + 1);
  const visible = ref(false);
  const choseUrl = ref<'fullUrl' | 'minUrl'>('minUrl');
  const imgUrl = computed(() =>
    images.value.length > 0 ? images.value[current.value][choseUrl.value] : ''
  );
  const beforeChange = () => {
    choseUrl.value = 'minUrl';
    transX.value = 0;
    transY.value = 0;
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
  return { showCurrent, visible, imgUrl, preImg, nextImg, images, choseUrl, current };
};
