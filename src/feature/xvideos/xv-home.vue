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
            width="225px"
            height="133px"
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
            :show-gap="true"
            :type="currentSorts === item.value ? 'success' : 'info'"
            @click="currentSorts = item.value"
          >
            {{ item.name }}
          </GhsTag>
        </div>
        <div>
          <GhsTag
            v-for="(item, index) in videoLength"
            :key="item.value + index"
            :show-gap="true"
            :type="currentVideoLength === item.value ? 'success' : 'info'"
            @click="currentVideoLength = item.value"
          >
            {{ item.name }}
          </GhsTag>
        </div>
        <div>
          <GhsTag
            v-for="(item, index) in quality"
            :key="item.value + index"
            :show-gap="true"
            :type="currentQuality === item.value ? 'success' : 'info'"
            @click="currentQuality = item.value"
          >
            {{ item.name }}
          </GhsTag>
        </div>
        <div overflow-auto max-h-22vh>
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
          max-height="50vh"
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
  import { onMounted, ref, watch } from 'vue-demi';

  import { xv_f_getPageInfo, xv_f_getVideoInfo } from '@/feature/xvideos/apis/XvApis';
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
  const ghsPlayerRef = ref<GhsPlayerExpose>();
  const sorts = ref([
    { value: 'relevance', name: '关联' },
    { value: 'uploaddate', name: '上传日期' },
    { value: 'rating', name: '评级' },
    { value: 'length', name: '长度' },
    { value: 'views', name: '观看次数' },
    { value: 'random', name: '随机' },
  ]);
  const currentSorts = ref('relevance');
  const videoLength = ref([
    { value: '', name: '全部' },
    { value: '1-3min', name: '1-3m' },
    { value: '3-10min', name: '3-10m' },
    { value: '10min_more', name: '>10m' },
    { value: '10-20min', name: '10-20m' },
    { value: '20min_more', name: '>20m' },
  ]);
  const currentVideoLength = ref('');
  const quality = ref([
    { value: '', name: '全部' },
    { value: 'hd', name: '720p+' },
    { value: '1080P', name: '1080P+' },
  ]);
  const currentQuality = ref('');
  const { loadHistoryData, handleDelete, historyData, searchHistorySave } =
    useSearchHistory('xvideos');
  const imgClick = async (item) => {
    const { jumpUrl } = item;
    const xvVideoInfo = await xv_f_getVideoInfo(jumpUrl);
    ghsPlayerRef.value.showWithTag(xvVideoInfo.urls, xvVideoInfo.title, 'm3u8');
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
    currentUrl,
  } = useMainPageHook({
    resolveCacheHtml: (url: string) => {
      f_request_html_get(url);
    },
    resolveMainPage: async (url: string) => {
      const html = await f_request_html_get(url);
      return await xv_f_getPageInfo(html);
    },
    resolveSearch: (value: string) => {
      searchHistorySave(value);
      value = value.replace(' ', '+');
      return `https://www.xvideos.com/?k=${value}`;
    },
    resolveImgClick: imgClick,
    resolvePageUrl: (url) => {
      const $url = new URL(url);
      $url.searchParams.set('sort', currentSorts.value);
      $url.searchParams.set('durf', currentVideoLength.value);
      $url.searchParams.set('quality', currentQuality.value);
      return $url.toString();
    },
  });
  const { collect_save, collect_delete, collect_click, cCollect, collect_list } =
    useCollect('xvideos');
  onMounted(async () => {
    await load('https://www.xvideos.com');
    await loadHistoryData();
    await collect_list();
  });
  watch(currentSorts, () => {
    load(currentUrl.value);
  });
  watch(currentVideoLength, () => {
    load(currentUrl.value);
  });
  watch(currentQuality, () => {
    load(currentUrl.value);
  });
</script>

<style scoped lang="less"></style>
