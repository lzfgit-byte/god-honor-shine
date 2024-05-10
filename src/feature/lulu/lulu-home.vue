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
            width="223px"
            height="140px"
            max-height="80%"
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
            v-for="(item, index) in sorts"
            :key="item.value + index"
            type="info"
            :show-gap="true"
            @click="currentSort = item.value"
          >
            {{ item.name }}
          </GhsTag>
        </div>
        <div>
          <GhsTag type="info">当前排序规则【{{ showSort }}】</GhsTag>
        </div>
        <div h-50vh of-auto>
          <GhsTag
            v-for="(item, index) in tags"
            :key="index"
            :info="item"
            :type="judgeCurrent(item.url, currentUrl) ? 'success' : 'waring'"
            :show-gap="true"
            @click="handleTagClick"
          ></GhsTag>
        </div>
        <GhsCollect
          max-height="30vh"
          :img-click="imgClick"
          :collect="cCollect"
          :collect-click="collect_click"
          :collect-delete="collect_delete"
          max-img-height="80%"
        ></GhsCollect>
      </div>
    </template>
  </ViewLayout>
  <GhsPlayer ref="ghsPlayerRef"></GhsPlayer>
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue-demi';

  import { computed } from 'vue';
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
  import { lulu_f_getPageInfo, lulu_f_getVideoUrl } from '@/feature/lulu/apis/LuLuApi';
  const ghsPlayerRef = ref<GhsPlayerExpose>();
  const sorts = [
    { value: 'id', name: '最新' },
    { value: 'hits', name: '最多' },
    { value: 'score', name: '推荐' },
    { value: 'likes', name: '最好' },
  ];
  const currentSort = ref('score');
  const showSort = computed(() => sorts.filter((item) => item.value === currentSort.value)[0].name);
  const judgeCurrent = (url1, url2) => {
    const $u1 = new URL(url1);
    const $u2 = new URL(url2);
    return $u1.host === $u2.host && $u1.pathname === $u2.pathname;
  };
  const { loadHistoryData, handleDelete, historyData, searchHistorySave } =
    useSearchHistory('lulu');
  const imgClick = async (item) => {
    const html = await f_request_html_get(item.jumpUrl);
    const url = await lulu_f_getVideoUrl(html);
    ghsPlayerRef.value.show(url, item.title, 'm3u8');
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
    currentUrl,
    reset,
  } = useMainPageHook({
    resolveCacheHtml: (url: string) => {
      f_request_html_get(url);
    },
    resolveMainPage: async (url: string) => {
      const html = await f_request_html_get(url);
      return await lulu_f_getPageInfo(html);
    },
    resolveSearch: (value: string) => {
      searchHistorySave(value);
      return `https://www.pornlulu.com/?q=${value}`;
    },
    resolveImgClick: imgClick,
    resolvePageUrl: (url: string) => {
      const $url = new URL(url);
      $url.searchParams.set('sort', currentSort.value);
      return $url.toString();
    },
  });
  const { collect_save, collect_delete, collect_click, cCollect, collect_list } =
    useCollect('lulu');
  onMounted(async () => {
    await load('https://www.pornlulu.com/cat/263');
    await loadHistoryData();
    await collect_list();
  });
  watch(currentSort, () => {
    load(currentUrl.value);
  });
</script>

<style scoped lang="less"></style>
