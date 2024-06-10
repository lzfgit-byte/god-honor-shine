import { onMounted, ref } from 'vue';
import type { BaseConfig, Item, Pagination, Tag, UrlReplace } from '@ghs/types';
import { isFalsity } from '@ilzf/utils';
import { f_getCurrentWebConfig, f_getPage, f_loadPage } from '@/utils/business';

export default (key: string) => {
  const webConfig = ref<BaseConfig>();
  const pagination = ref<Pagination[]>();
  const items = ref<Item[]>();
  const tags = ref<Tag[]>();
  const urlReplace = ref<UrlReplace[]>();

  const load = async (url: string = null) => {
    const page = isFalsity(url) ? await f_getPage(key) : await f_loadPage(url);
    pagination.value = page.pagination;
    items.value = page.items;
    tags.value = page.tags;
    urlReplace.value = page.urlReplace;
  };

  const handlePageClick = async (item: Pagination) => {
    await load(item.url);
  };
  const init = async () => {
    webConfig.value = await f_getCurrentWebConfig(key);
  };

  onMounted(async () => {
    await init();
    await load();
  });
  return { pagination, handlePageClick, items, tags, urlReplace, webConfig };
};
