import { onMounted, ref } from 'vue';
import { getHtml } from '@/utils/functions';
import { badNews_getBadNewsInfo } from '@/feature/bad-news/utils/bn-functions';
import type { pageInfo } from '@/feature/bad-news/type/types';

const PORN_URL = 'https://bad.news/tag/porn';
export default () => {
  const videos = ref<pageInfo[]>();
  const getPageInfo = async (url?: string): Promise<pageInfo[]> => {
    const pUrl = await getHtml(url || PORN_URL);
    return await badNews_getBadNewsInfo(pUrl);
  };

  onMounted(async () => {
    videos.value = await getPageInfo();
    console.log(videos.value);
  });
  return { videos };
};
