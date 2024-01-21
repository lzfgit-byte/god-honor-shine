import { ref } from 'vue';
import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';
import { nextTick } from 'vue-demi';
interface OptType {
  resolveMainPage: (url: string) => Promise<MainPage>;
  resolveSearch: (value: string) => string;
}
export default (opts: OptType) => {
  const pagination = ref<PaginationType[]>();
  const tags = ref<PageTags[]>();
  const items = ref<PageItemType[]>();
  const load = async (url: string) => {
    if (!url) {
      return;
    }
    const mainPage = await opts.resolveMainPage(url);
    pagination.value = [];
    items.value = [];
    tags.value = [];
    await nextTick();
    pagination.value = mainPage.pagination;
    items.value = mainPage.items;
    tags.value = mainPage.tags;
  };
  const handlerPagination = async (item: PaginationType) => {
    await load(item.url);
  };
  const handleSearch = async (value: string) => {
    await load(opts.resolveSearch(value));
  };
  const handleImageClick = (item: PageItemType) => {};

  return { handlerPagination, handleSearch, handleImageClick, load, pagination, items, tags };
};
