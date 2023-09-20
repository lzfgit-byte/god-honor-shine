import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { clearCache, getHtml } from '@/utils/functions';
import type { pageInfo, pageType, tagType, video } from '@/feature/bad-news/type/types';
import { nprogress } from '@/utils/nprogress';
import { badNews_getAVPageInfo } from '@/feature/bad-news/utils/bn-functions';

let PORN_URL = 'https://bad.news/av';
export default (baseUrl?: string) => {
  PORN_URL = baseUrl || PORN_URL;
  const videos = ref<video[]>();
  const pages = ref<pageType[]>();
  const tags = ref<tagType[]>();
  const currentUrl = ref(PORN_URL);
  const searchInput = ref('');
  const getPageInfo = async (url?: string): Promise<pageInfo> => {
    const pUrl = await getHtml(url || PORN_URL);
    return await badNews_getAVPageInfo(pUrl);
  };

  const loadHtml = async (url?: string) => {
    nprogress.start();
    const pageInfo = await getPageInfo(url);
    videos.value = pageInfo.video;
    pages.value = pageInfo.pages;
    tags.value = pageInfo.tags;
    nprogress.done(true);
  };
  const handlerJump = (url?: string) => {
    currentUrl.value = url || currentUrl.value;
    loadHtml(currentUrl.value);
  };
  const handlerSearch = () => {
    if (searchInput.value) {
      handlerJump(`https://bad.news/av/search/q-${searchInput.value}/via-log`);
    } else {
      handlerJump(PORN_URL);
    }
  };
  onMounted(async () => {
    loadHtml();
  });
  return { videos, pages, handlerJump, tags, searchInput, handlerSearch };
};
