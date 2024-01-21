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
      <GhsPagination :pagination="pagination"></GhsPagination>
    </template>
  </ViewLayout>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import type { MainPage, PageItemType, PageTags, PaginationType } from '@ghs/share';

  import { hw_f_getPageInfo } from '@/feature/hentai-word/apis/HwApis';
  import { f_request_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';

  const pagination = ref<PaginationType[]>();
  const tags = ref<PageTags[]>();
  const items = ref<PageItemType[]>();
  const init = async () => {
    const html = await f_request_html_get('https://thehentaiworld.com/?new');
    const mainPage = await hw_f_getPageInfo(html);
    pagination.value = mainPage.pagination;
    items.value = mainPage.items;
    tags.value = mainPage.tags;
  };
  onMounted(() => {
    init();
  });
</script>

<style scoped lang="less"></style>
