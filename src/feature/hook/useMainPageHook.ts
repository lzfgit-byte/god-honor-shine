import { ref } from 'vue';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import { nextTick } from 'vue-demi';
interface OptType {
  resolveMainPage?: (url: string) => Promise<MainPage>;
  resolveSearch?: (value: string) => string;
  resolveImgClick?: (item: PageItemType) => void;
}
export default (opts: OptType) => {
  const loading = ref(false);
  const currentUrl = ref();
  const pagination = ref<PaginationType[]>();
  const tags = ref<PageTags[]>();
  const items = ref<PageItemType[]>();
  const load = async (url: string) => {
    if (!url) {
      return;
    }
    loading.value = true;
    currentUrl.value = url;
    const mainPage = await opts?.resolveMainPage(url);
    pagination.value = [];
    items.value = [];
    tags.value = [];
    await nextTick();
    pagination.value = mainPage.pagination;
    items.value = mainPage.items;
    tags.value = mainPage.tags;
    loading.value = false;
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
  };
};
