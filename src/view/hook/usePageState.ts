import { onMounted, ref } from 'vue';
import type { Pagination } from '@ghs/types';
import { isFalsity } from '@ilzf/utils';
import { f_getPage, f_loadPage } from '@/utils/business';

export default (key: string) => {
  const pagination = ref<Pagination[]>();

  const load = async (url: string = null) => {
    const page = isFalsity(url) ? await f_getPage(key) : await f_loadPage(url);
    pagination.value = page.pagination;
  };

  const handlePageClick = async (url: String) => {};

  onMounted(async () => {
    await load();
  });
  return { pagination, handlePageClick };
};
