import { onMounted, ref } from 'vue';
import { clearCache, getHtml } from '@/utils/functions';
import { badNews_getBadNewsInfo } from '@/feature/bad-news/utils/bn-functions';
import type { pageInfo, pageType, video } from '@/feature/bad-news/type/types';
import { nprogress } from '@/utils/nprogress';

let PORN_URL = 'https://bad.news/tag/porn';
export default (baseUrl?: string) => {
  PORN_URL = baseUrl || PORN_URL;
  const videos = ref<video[]>();
  const pages = ref<pageType[]>();

  const getPageInfo = async (url?: string): Promise<pageInfo> => {
    // @ts-expect-error
    clearCache(url || PORN_URL, 'html');
    const pUrl = await getHtml(url || PORN_URL);
    return await badNews_getBadNewsInfo(pUrl);
  };

  const loadHtml = async (url?: string) => {
    nprogress.start();
    const pageInfo = await getPageInfo(url);
    videos.value = pageInfo.video;
    pages.value = pageInfo.pages;
    nprogress.done(true);
  };
  const handlerJump = (url?: string) => {
    loadHtml(url);
  };
  onMounted(async () => {
    loadHtml();
  });
  return { videos, pages, handlerJump };
};
