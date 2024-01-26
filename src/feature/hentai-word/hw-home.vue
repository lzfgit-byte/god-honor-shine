<template>
  <ViewLayout v-model:loading="loading" :reload="reload">
    <template #body>
      <div ref="bodyRef" h-full w-full overflow-auto>
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
          @trigger-collect="collect_save(JSON.stringify(item))"
        ></GhsItem>
      </div>
    </template>
    <template #action>
      <GhsSearch
        :history-data="historyData"
        @reset="reset"
        @search="handleSearch"
        @delete-search="handleDelete"
      ></GhsSearch>
      <GhsPagination :pagination="pagination" @click="handlerPagination"></GhsPagination>
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

        <GhsScroller max-height="45vh" absolute bottom-0>
          <GhsCollectItem
            v-for="item in cCollect"
            :key="item.jumpUrl"
            :info="item"
            @click="imgClick(item)"
            @delete="collect_delete(JSON.stringify(item))"
          ></GhsCollectItem>
        </GhsScroller>
      </div>
    </template>
  </ViewLayout>
  <GhsPlayer ref="ghsPlayerRef"></GhsPlayer>
  <ImgViewer ref="imgViewRef"></ImgViewer>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue-demi';

  import {
    hw_f_getImgInfo,
    hw_f_getPageInfo,
    hw_f_getVideoInfo,
  } from '@/feature/hentai-word/apis/HwApis';
  import { f_request_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import GhsSearch from '@/components/search/ghs-search.vue';
  import useMainPageHook from '@/feature/hook/useMainPageHook';
  import GhsPlayer from '@/components/player/ghs-player.vue';
  import type { GhsPlayerExpose } from '@/components/player/types';
  import ImgViewer from '@/components/imgViewer/img-viewer.vue';
  import type { ImgViewerExpose } from '@/components/imgViewer/type';
  import GhsTag from '@/components/tag/ghs-tag.vue';

  import useSearchHistory from '@/feature/hook/useSearchHistory';
  import useCollect from '@/feature/hook/useCollect';
  import GhsCollectItem from '@/components/collectItem/ghs-collect-item.vue';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  const ghsPlayerRef = ref<GhsPlayerExpose>();
  const imgViewRef = ref<ImgViewerExpose>();
  const { loadHistoryData, handleDelete, historyData, searchHistorySave } =
    useSearchHistory('hentaiWord');
  const imgClick = async (item) => {
    const { flatTags, jumpUrl } = item;
    const isVideo = flatTags.some((item) => item.title.toUpperCase() === 'VIDEO');
    if (isVideo) {
      const hwVideoInfo = await hw_f_getVideoInfo(jumpUrl);
      ghsPlayerRef.value.show(hwVideoInfo.url, hwVideoInfo.title, 'mp4');
    } else {
      const hwImgInfos = await hw_f_getImgInfo(jumpUrl);
      imgViewRef.value.show(hwImgInfos);
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
    resolveMainPage: async (url: string) => {
      const html = await f_request_html_get(url);
      return await hw_f_getPageInfo(html);
    },
    resolveSearch: (value: string) => {
      searchHistorySave(value);
      const searchVal = value.replaceAll(' ', '+');
      return `https://thehentaiworld.com/?s=${searchVal}`;
    },
    resolveImgClick: imgClick,
  });
  const { collect_save, collect_delete, cCollect, collect_list } = useCollect('hentaiWord');
  onMounted(async () => {
    await load('https://thehentaiworld.com/?new');
    await loadHistoryData();
    await collect_list();
  });
</script>

<style scoped lang="less"></style>
