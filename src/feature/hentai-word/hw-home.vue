<template>
  <ViewLayout>
    <template #body>
      <div h-full w-full overflow-auto>
        <GhsItem
          v-for="(item, index) in items"
          :key="index"
          :title="item.title"
          :cover-img="item.coverImg"
          :jump-url="item.jumpUrl"
          :tags="item.tags"
          :flat-tags="item.flatTags"
          width="220px"
          height="147px"
        ></GhsItem>
      </div>
    </template>
    <template #action>
      <GhsSearch @search="handleSearch"></GhsSearch>
      <GhsPagination :pagination="pagination" @click="handlerPagination"></GhsPagination>
    </template>
  </ViewLayout>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import type { PageItemType, PageTags, PaginationType } from '@ghs/share';

  import { nextTick } from 'vue-demi';
  import { hw_f_getPageInfo } from '@/feature/hentai-word/apis/HwApis';
  import { f_request_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import GhsSearch from '@/components/search/ghs-search.vue';

  const pagination = ref<PaginationType[]>();
  const tags = ref<PageTags[]>();
  const items = ref<PageItemType[]>();
  const load = async (url = 'https://thehentaiworld.com/?new') => {
    const html = await f_request_html_get(url);
    const mainPage = await hw_f_getPageInfo(html);
    pagination.value = [];
    items.value = [];
    tags.value = [];
    await nextTick();
    pagination.value = mainPage.pagination;
    items.value = mainPage.items;
    tags.value = mainPage.tags;
  };
  const handlerPagination = (item: PaginationType) => {
    load(item.url);
  };
  const handleSearch = (value: string) => {
    const searchVal = value.replaceAll(' ', '+');
    load(`https://thehentaiworld.com/?s=${searchVal}`);
  };
  onMounted(() => {
    load();
  });
</script>

<style scoped lang="less"></style>
