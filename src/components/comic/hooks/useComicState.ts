import { onMounted, ref } from 'vue';
import type { CComic, CContent } from '@ghs/types';
import { message } from 'ant-design-vue';
import { isString } from '@ilzf/utils';
import type { ComicHistory } from '@ghs/constant';
import useGlobalState from '@/hooks/use-global-state';
import { f_getComicIImages, f_getContent, f_getCurrentContentUrl } from '@/utils/business';

export default (url: string) => {
  const { logs } = useGlobalState();
  const containerRef = ref<HTMLDivElement>();
  const contents = ref<CContent[]>([]);
  const comicImages = ref<CComic[]>([]);
  const drawValue = ref(true);
  const currentContent = ref<ComicHistory>();
  const loadContent = async () => {
    contents.value = await f_getContent(url);
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
    comicImages.value = await f_getComicIImages(url);
    currentContent.value = await f_getCurrentContentUrl();
  };
  onMounted(async () => {
    await loadContent();
    currentContent.value = await f_getCurrentContentUrl();
  });
  return { containerRef, contents, comicImages, getImages, drawValue, currentContent };
};
