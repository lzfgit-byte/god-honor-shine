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
            @click="customTagClick(item)"
          ></GhsTag>
          <GhsTag type="info">当前排序规则【{{ sortComp }}】</GhsTag>
        </div>
        <GhsCollect
          max-height="90vh"
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
  import { it } from 'node:test';
  import { onMounted, ref } from 'vue-demi';
  import { computed } from 'vue';
  import type { PageTags } from '@ghs/share';
  import code from '@/feature/rule34/code/clear-others?raw';
  import { f_request_html_get, f_win_open_any } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import GhsSearch from '@/components/search/ghs-search.vue';
  import useMainPageHook from '@/feature/hook/useMainPageHook';
  import GhsTag from '@/components/tag/ghs-tag.vue';
  import useSearchHistory from '@/feature/hook/useSearchHistory';
  import useCollect from '@/feature/hook/useCollect';
  import GhsCollect from '@/components/collectItem/ghs-collect.vue';
  import { r34_f_getPageInfo } from '@/feature/rule34/apis/R34Apis';
  import GhsPlayer from '@/components/player/ghs-player.vue';
  import type { GhsPlayerExpose } from '@/components/player/types';
  const ghsPlayerRef = ref<GhsPlayerExpose>();
  const { loadHistoryData, handleDelete, historyData, searchHistorySave } =
    useSearchHistory('rule34');
  const sort = ref<PageTags>();
  const sortComp = computed(() => sort?.value?.title || 'Most Relevant');
  const customTagClick = (item) => {
    sort.value = item;
    reload();
  };
  const imgClick = async (item) => {
    f_win_open_any(item.jumpUrl, code, 831, 600);
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
    bodyRef,
    reset,
  } = useMainPageHook({
    resolvePageUrl: (url: string) => {
      const sort_url = sort?.value?.url;
      if (sort_url) {
        const arr = sort_url.split(';');
        if (arr.length === 2) {
          const [key, value] = arr;
          let newUrl = new URL(url);
          newUrl.searchParams.set(key, value);
          return newUrl.toString();
        }
      }
      return url;
    },
    resolveCacheHtml: (url: string) => {
      f_request_html_get(url);
    },
    resolveMainPage: async (url: string) => {
      const html = await f_request_html_get(url);
      return await r34_f_getPageInfo(html);
    },
    resolveSearch: (value: string) => {
      searchHistorySave(value);
      return `https://rule34video.com/search/${value}/`;
    },
    resolveImgClick: imgClick,
  });
  const { collect_save, collect_delete, collect_click, cCollect, collect_list } =
    useCollect('rule34');
  onMounted(async () => {
    await load('https://rule34video.com/');
    await loadHistoryData();
    await collect_list();
  });
</script>

<style scoped lang="less"></style>
