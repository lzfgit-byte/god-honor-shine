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
            :force="true"
            width="190px"
            height="247px"
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
            @click="imgClick(item, true)"
          ></GhsTag>
        </div>
        <GhsCollect
          max-height="90vh"
          :img-click="imgClick"
          :collect="cCollect"
          :force="true"
          :collect-click="collect_click"
          :collect-delete="collect_delete"
        ></GhsCollect>
      </div>
    </template>
  </ViewLayout>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue-demi';
  import { useRouter } from 'vue-router';
  import { f_request_html_get, f_win_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import GhsSearch from '@/components/search/ghs-search.vue';
  import useMainPageHook from '@/feature/hook/useMainPageHook';
  import GhsTag from '@/components/tag/ghs-tag.vue';
  import useSearchHistory from '@/feature/hook/useSearchHistory';
  import useCollect from '@/feature/hook/useCollect';
  import GhsCollect from '@/components/collectItem/ghs-collect.vue';
  import { c18_f_getPageInfo } from '@/feature/18comic/apis/18ComicApis';
  const { loadHistoryData, handleDelete, historyData, searchHistorySave } =
    useSearchHistory('18Comic');

  const router = useRouter();
  const imgClick = (item, isLoad = false) => {
    if (isLoad) {
      load(item.url);
      return;
    }
    router.push({ path: '/18-comic-reader', query: { link: item.jumpUrl } });
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
      return url;
    },
    resolveCacheHtml: (url: string) => {
      f_win_html_get(url);
    },
    resolveMainPage: async (url: string) => {
      const html = await f_win_html_get(url);
      return await c18_f_getPageInfo(html);
    },
    resolveSearch: (value: string) => {
      searchHistorySave(value);
      return `https://18comic.vip/search/photos?search_query=${value}`;
    },
    resolveImgClick: imgClick,
  });
  const { collect_save, collect_delete, collect_click, cCollect, collect_list } =
    useCollect('18Comic');
  onMounted(async () => {
    await load('https://18comic.vip/');
    await loadHistoryData();
    await collect_list();
  });
</script>

<style scoped lang="less"></style>
