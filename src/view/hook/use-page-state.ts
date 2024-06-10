import { onMounted, ref } from 'vue';
import type { BaseConfig, Item, Pagination, Tag, UrlReplace } from '@ghs/types';
import { isFalsity } from '@ilzf/utils';
import {
  f_cacheDirDb,
  f_getCurrentWebConfig,
  f_getPage,
  f_loadPage,
  f_search,
} from '@/utils/business';

export default (key: string) => {
  const webConfig = ref<BaseConfig>();
  const pagination = ref<Pagination[]>();
  const items = ref<Item[]>();
  const tags = ref<Tag[]>();
  const urlReplace = ref<UrlReplace[]>();
  const dbPath = ref();

  const load = async (url: string = null) => {
    pagination.value = [];
    items.value = [];
    tags.value = [];
    urlReplace.value = [];

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

  const handleSearch = async (value: string) => {
    await load(await f_search(value));
  };

  const loadDbPath = async () => {
    dbPath.value = await f_cacheDirDb();
  };

  onMounted(async () => {
    await init();
    await load();
    await loadDbPath();
  });
  return { pagination, handlePageClick, items, tags, urlReplace, webConfig, handleSearch, dbPath };
};
