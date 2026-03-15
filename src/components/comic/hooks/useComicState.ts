import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import type { CComic, CContent } from '@ghs/types';
import { message } from 'ant-design-vue';
import { hashString, isString, waitTime } from '@ilzf/utils';
import type { ComicHistory } from '@ghs/constant';
import { useScroll } from '@vueuse/core';
import { watchEffect } from 'vue-demi';
import {
  f_getComicIImages,
  f_getContent,
  f_getCurrentContentUrl,
  f_updateCurrentComic,
} from '@/utils/business';
import bus from '@/utils/bus';
import { ImgEmitEnum } from '@/components/imgViewer/hooks/useImgShow';
import useGlobalState from '@/hooks/use-global-state';
export let imagesBase64: Record<string, number> = {};
export const ComicEmitEnum = {
  comicNext: 'comicNext',
  comicPre: 'comicPre',
};
export default (url: string) => {
  const containerRef = ref<HTMLDivElement>();
  const contents = ref<CContent[]>([]);
  const comicImages = ref<CComic[]>([]);
  const drawValue = ref(true);
  const currentContent = ref<ComicHistory>();
  const autoLoadNext = ref(false);
  const commentDraw = ref(false);
  const { y } = useScroll(containerRef, {
    behavior: 'smooth',
  });
  const percent = computed(() =>
    containerRef.value?.scrollHeight ? y.value / containerRef.value?.scrollHeight : 0
  );
  const currentIndex = computed(
    () => contents.value?.findIndex((item) => item.url === currentContent.value?.contentUrl) || -1
  );
  const loadContent = async () => {
    contents.value = await f_getContent(url);
  };
  const loadNext = async () => {
    await nextTick(() => {
      if (
        autoLoadNext.value &&
        currentIndex.value !== -1 &&
        currentIndex.value + 1 < contents.value?.length
      ) {
        f_getComicIImages(contents.value[currentIndex.value + 1].url);
      }
    });
  };
  const getImages = async (url: string) => {
    if (!url) {
      message.warn('目录地址为空');
      return;
    }
    if (isString(url) && url.trim() === '') {
      message.warn('目录地址为空');
      return;
    }
    offComicEmit();
    imagesBase64 = {};
    comicImages.value = await f_getComicIImages(url);
    comicImages.value.forEach((item, index) => {
      imagesBase64[hashString(item.url)] = index;
    });
    if (Object.keys(imagesBase64).length !== comicImages.value?.length) {
      message.warn('图片解析数量错误');
    }
    currentContent.value = await f_getCurrentContentUrl();
    containerRef.value.scrollTo({ top: 0, behavior: 'smooth' });
    loadNext();
  };

  watchEffect(() => {
    if (containerRef.value?.scrollHeight) {
      f_updateCurrentComic(y.value)?.then(() => 1);
    }
  });
  onMounted(async () => {
    await loadContent();
    currentContent.value = await f_getCurrentContentUrl();
    if (currentContent.value) {
      await getImages(currentContent.value.contentUrl);
      await waitTime();
      y.value = currentContent.value.currentImage;
      document
        .querySelector('.currentContentInDraw')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (contents.value.length === 1) {
      // 就一个目录，则加载
      await getImages(contents.value[0].url);
    }
  });
  const offComicEmit = () => {
    bus.off(ComicEmitEnum.comicPre);
    bus.off(ComicEmitEnum.comicNext);
    bus.off(ImgEmitEnum.preImg);
    bus.off(ImgEmitEnum.nextImg);
  };
  onUnmounted(() => {
    offComicEmit();
  });
  return {
    containerRef,
    contents,
    comicImages,
    getImages,
    drawValue,
    currentContent,
    percent,
    autoLoadNext,
    commentDraw,
  };
};
const comicFlat = ref(0);
const maxWidth = computed(() => `${80 - comicFlat.value}vw`);
const handleWheel = (event: any) => {
  if (event.ctrlKey) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -10 : 10; // 滚轮方向控制缩放步长
    comicFlat.value += delta;
    if (comicFlat.value > 60) {
      comicFlat.value = 60;
    } else if (comicFlat.value < -20) {
      comicFlat.value = -20;
    }
  }
};
export const comicStata = {
  comicFlat,
  maxWidth,
  handleWheel,
};
