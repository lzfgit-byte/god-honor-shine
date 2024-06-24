import { onMounted, ref } from 'vue';
import type { CComic, CContent } from '@ghs/types';
import useGlobalState from '@/hooks/use-global-state';
import { f_getComicIImages, f_getContent } from '@/utils/business';

export default (url: string) => {
  const { logs } = useGlobalState();
  const containerRef = ref<HTMLDivElement>();
  const contents = ref<CContent[]>([]);
  const comicImages = ref<CComic[]>([]);
  const loadContent = async () => {
    contents.value = await f_getContent(url);
  };
  const getImages = async (url: string) => {
    comicImages.value = await f_getComicIImages(url);
  };
  onMounted(async () => {
    await loadContent();
  });
  return { containerRef, contents, comicImages, getImages };
};
