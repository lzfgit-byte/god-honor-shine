import { ref } from 'vue-demi';
import type { HWImgInfo } from '@ghs/share';
import { computed } from 'vue';

export default () => {
  const images = ref<HWImgInfo[]>([]);
  const current = ref(0);
  const showCurrent = computed(() => current.value + 1);
  const visible = ref(false);
  const choseUrl = ref<'fullUrl' | 'minUrl'>('minUrl');
  const imgUrl = computed(() =>
    images.value.length > 0 ? images.value[current.value][choseUrl.value] : ''
  );
  const preImg = () => {
    choseUrl.value = 'minUrl';
    if (current.value > 0) {
      current.value--;
    } else {
      current.value = images.value.length - 1;
    }
  };
  const nextImg = () => {
    choseUrl.value = 'minUrl';
    if (current.value < images.value.length - 1) {
      current.value++;
    } else {
      current.value = 0;
    }
  };
  return { showCurrent, visible, imgUrl, preImg, nextImg, images, choseUrl, current };
};
