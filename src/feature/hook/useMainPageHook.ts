import { computed, ref } from 'vue';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import { nextTick, watchEffect } from 'vue-demi';
interface OptType {
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
  };
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
