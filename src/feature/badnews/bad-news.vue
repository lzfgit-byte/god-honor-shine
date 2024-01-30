<template>
  <ViewLayout v-model:loading="loading" :reload="reload">
    <template #action>
      <div flex w-full h-full justify-between items-center p-l-4>
        <GhsSearch
          :history-data="historyData"
          @reset="reset"
          @search="handleSearch"
          @delete-search="handleDelete"
        ></GhsSearch>
        <GhsPagination :pagination="pagination" @click="handlerPagination"></GhsPagination>
      </div>
    </template>
    <template #body>
      <div ref="bodyRef" h-full w-full overflow-auto>
        <transition-group
          name="custom-classes"
          enter-active-class="animate__animated animate__pulse"
        >
          <GhsItem
            v-for="(item, index) in items"
            :key="index"
            :title="item.title"
            :cover-img="item.coverImg"
            :jump-url="item.jumpUrl"
            :tags="item.tags"
            :flat-tags="item.flatTags"
            width="270px"
            height="150px"
            @img-click="handleImageClick(item)"
            @trigger-collect="collect_save(JSON.stringify(item))"
          ></GhsItem>
        </transition-group>
      </div>
    </template>
    <template #slide>
      <div h-full w-full flex flex-col justify-between>
        <div>
          <GhsTag
            v-for="(item, index) in tags"
            :key="index"
            :info="item"
            type="waring"
            :show-gap="true"
            @click="handleTagClick"
          ></GhsTag>
        </div>
        <GhsCollect
          max-height="45vh"
          :img-click="imgClick"
          :collect="cCollect"
          :collect-click="collect_click"
          :collect-delete="collect_delete"
        ></GhsCollect>
      </div>
    </template>
  </ViewLayout>
  <GhsPlayer ref="ghsPlayerRef"></GhsPlayer>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue-demi';

  import type { PageItemType } from '@ghs/share';
  import { f_request_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import GhsSearch from '@/components/search/ghs-search.vue';
  import useMainPageHook from '@/feature/hook/useMainPageHook';
  import GhsPlayer from '@/components/player/ghs-player.vue';
  import type { GhsPlayerExpose } from '@/components/player/types';
  import GhsTag from '@/components/tag/ghs-tag.vue';

  import useSearchHistory from '@/feature/hook/useSearchHistory';
  import useCollect from '@/feature/hook/useCollect';
  import GhsCollect from '@/components/collectItem/ghs-collect.vue';
  import { bdn_f_getPageInfo, bdn_f_getVideoInfo } from '@/feature/badnews/apis/badApis';
  const ghsPlayerRef = ref<GhsPlayerExpose>();
  const { loadHistoryData, handleDelete, historyData, searchHistorySave } =
    useSearchHistory('bedNews');
  const imgClick = async (item: PageItemType) => {
    const { flatTags, jumpUrl, title } = item;
    if (flatTags.some((item) => item.title === 'm3u8')) {
      ghsPlayerRef.value.show(jumpUrl, title, 'm3u8');
    }
    if (flatTags.some((item) => item.title === 'mp4')) {
      ghsPlayerRef.value.show(jumpUrl, title, 'mp4');
    }
    if (
      flatTags.some((item) => item.title === 'av') ||
      flatTags.some((item) => item.title === 'dm')
    ) {
      const info = await bdn_f_getVideoInfo(item.jumpUrl);
      ghsPlayerRef.value.show(info.url, title, info.type);
    }
  };
  const {
    load,
    handleSearch,
    handleImageClick,
    handlerPagination,
    pagination,
    items,
    tags,
    reload,
    loading,
    handleTagClick,
    bodyRef,
    reset,
  } = useMainPageHook({
    resolveCacheHtml: (url: string) => {
      f_request_html_get(url);
    },
    resolveMainPage: async (url: string) => {
      const html = await f_request_html_get(url);
      return await bdn_f_getPageInfo(html);
    },
    resolveSearch: (value: string) => {
      searchHistorySave(value);
      const searchVal = value.replaceAll(' ', '+');
      return `https://thehentaiworld.com/?s=${searchVal}`;
    },
    resolveImgClick: imgClick,
  });
  const { collect_save, collect_delete, collect_click, cCollect, collect_list } =
    useCollect('bedNews');
  onMounted(async () => {
    await load('https://bad.news/tag/porn');
    await loadHistoryData();
    await collect_list();
  });
</script>

<style scoped lang="less"></style>
