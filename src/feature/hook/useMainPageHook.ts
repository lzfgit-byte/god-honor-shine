import { ref } from 'vue';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import { nextTick, watch } from 'vue-demi';
import { executeFunc } from '@ghs/share';
interface OptType {
  resolveCacheHtml?: (url: string) => void;
  resolveMainPage?: (url: string) => Promise<MainPage>;
  resolveSearch?: (value: string) => string;
  resolveImgClick?: (item: PageItemType) => void;
}
export default (opts: OptType) => {
  const loading = ref(false);
  const firstUrl = ref();
  const currentUrl = ref();
  const pagination = ref<PaginationType[]>();
  const tags = ref<PageTags[]>();
  const items = ref<PageItemType[]>();
  const bodyRef = ref<HTMLDivElement>();
  const nextPage = ref();
  const load = async (url: string) => {
    if (!url) {
      return;
    }
    loading.value = true;
    currentUrl.value = url;
    firstUrl.value = firstUrl.value || url;
    const mainPage = await opts?.resolveMainPage(url);
    pagination.value = [];
    items.value = [];
    tags.value = [];
    await nextTick();
    pagination.value = mainPage.pagination;
    items.value = mainPage.items;
    tags.value = mainPage.tags;
    loading.value = false;
    bodyRef.value.scrollTo({ top: 0, behavior: 'smooth' });
    const index = pagination.value.findIndex((i) => i.isCurrent);
    if (index > -1 && index < pagination.value.length - 1) {
      nextPage.value = pagination.value[index + 1].url;
    }
  };
  watch(nextPage, () => {
    if (nextPage.value) {
      executeFunc(opts.resolveCacheHtml, nextPage.value);
    }
  });
  const handlerPagination = async (item: PaginationType) => {
    await load(item.url);
  };
  const handleSearch = async (value: string) => {
    await load(opts?.resolveSearch(value));
  };
  const handleImageClick = (item: PageItemType) => {
    opts?.resolveImgClick(item);
  };
  const reload = async () => {
    await load(currentUrl.value);
  };
  const reset = async () => {
    await load(firstUrl.value);
  };
  const handleTagClick = async (info: PageTags) => {
    if (info.url) {
      await load(info.url);
    }
  };
  return {
    handlerPagination,
    handleSearch,
    handleImageClick,
    load,
    pagination,
    items,
    tags,
    reload,
    loading,
    handleTagClick,
    bodyRef,
    reset,
  };
};
