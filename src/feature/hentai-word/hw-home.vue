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
          @img-click="handleImageClick(item)"
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
  import { onMounted } from 'vue';

  import { hw_f_getPageInfo, hw_f_getVideoInfo } from '@/feature/hentai-word/apis/HwApis';
  import { f_request_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import GhsSearch from '@/components/search/ghs-search.vue';
  import useMainPageHook from '@/feature/hook/useMainPageHook';

  const { load, handleSearch, handleImageClick, handlerPagination, pagination, items, tags } =
    useMainPageHook({
      resolveMainPage: async (url: string) => {
        const html = await f_request_html_get(url);
        return await hw_f_getPageInfo(html);
      },
      resolveSearch: (value: string) => {
        const searchVal = value.replaceAll(' ', '+');
        return `https://thehentaiworld.com/?s=${searchVal}`;
      },
      resolveImgClick: async (item) => {
        const { flatTags, jumpUrl } = item;
        const isVideo = flatTags.some((item) => item.title.toUpperCase() === 'VIDEO');
        if (isVideo) {
          const hwVideoInfo = await hw_f_getVideoInfo(jumpUrl);
          console.log(hwVideoInfo);
        } else {
          console.log();
        }
      },
    });

  onMounted(() => {
    load('https://thehentaiworld.com/?new');
  });
</script>

<style scoped lang="less"></style>
