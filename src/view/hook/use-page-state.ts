import { onMounted, ref } from 'vue';
import type { BaseConfig, Item, Pagination, Tag, UrlReplace } from '@ghs/types';
import { isFalsity, waitTime } from '@ilzf/utils';
import {
  f_appSetDbDir,
  f_cacheDirDb,
  f_cacheDirSize,
  f_cacheSuffixClean,
  f_getCurrentWebConfig,
  f_getPage,
  f_loadPage,
  f_search,
} from '@/utils/business';
import { nprogress } from '@/utils/nprogress';
import useGlobalState from '@/hooks/use-global-state';

export default (key: string) => {
  const { cacheSize, dbPath, webConfig, loading, pagination, items, tags, urlReplace, currentUrl } =
    useGlobalState();

  const calcCacheSize = async () => {
    cacheSize.value = await f_cacheDirSize();
  };

  const load = async (url: string = null) => {
    loading.value = true;
    nprogress.start();
    const page = isFalsity(url) ? await f_getPage(key) : await f_loadPage(url);

    pagination.value = [];
    items.value = [];
    tags.value = [];
    urlReplace.value = [];
    currentUrl.value = url;

    pagination.value = page.pagination;
    items.value = page.items;
    tags.value = page.tags;
    urlReplace.value = page.urlReplace;

    loading.value = false;
    nprogress.done(true);
    await calcCacheSize();
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

  const setDbPath = async () => {
    const fileInput: HTMLInputElement = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.db';
    fileInput.addEventListener('change', function () {
      let selectedFile = fileInput.files[0];
      const path = selectedFile.path;
      f_appSetDbDir(path);
    });
    fileInput.click();
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
    setDbPath,
    loading,
    calcCacheSize,
    load,
  };
};
