import { onMounted, ref } from 'vue';
import type { BaseConfig, Item, Pagination, Tag, UrlReplace } from '@ghs/types';
import { isFalsity } from '@ilzf/utils';
import {
  f_cacheDirDb,
  f_cacheDirSize,
  f_cacheSuffixClean,
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
  const currentUrl = ref();
  const cacheSize = ref();

  const load = async (url: string = null) => {
    pagination.value = [];
    items.value = [];
    tags.value = [];
    urlReplace.value = [];
    currentUrl.value = url;

    const page = isFalsity(url) ? await f_getPage(key) : await f_loadPage(url);
    pagination.value = page.pagination;
    items.value = page.items;
    tags.value = page.tags;
    urlReplace.value = page.urlReplace;

    cacheSize.value = await f_cacheDirSize();
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
  const refresh = async () => {
    await load(currentUrl.value);
  };
  const clearCache = async (suffix: string = null) => {
    await f_cacheSuffixClean(suffix);
    await refresh();
  };

  onMounted(async () => {
    await init();
    await load();
    await loadDbPath();
  });
  return {
    pagination,
    handlePageClick,
    items,
    tags,
    urlReplace,
    webConfig,
    handleSearch,
    dbPath,
    clearCache,
    cacheSize,
  };
};
