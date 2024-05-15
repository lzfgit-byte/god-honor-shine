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
        <div>
          <GhsTag
            v-for="(item, index) in produce"
            :key="item.value + index"
            :show-gap="true"
            :type="currentProduce === item.value ? 'success' : 'info'"
            @click="currentProduce = item.value"
          >
            {{ item.name }}
          </GhsTag>
        </div>
        <div overflow-auto max-h-19vh>
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

  import { ph_f_getPageInfo, ph_f_getVideoInfo } from '@/feature/pornhub/apis/PhApis';
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
    { value: '', name: '全部' },
    { value: 'o=mv,cc=us', name: '最多观看' },
    { value: 'o=tr', name: '最高分' },
    { value: 'o=ht,cc=us', name: '最热门' },
    { value: 'o=lg', name: '最长' },
    { value: 'o=mr', name: '最新' },
  ]);
  const currentSorts = ref('');
  const videoLength = ref([
    { value: '', name: '全部' },
    { value: '10', name: '<10' },
    { value: '20', name: '<20' },
    { value: '30', name: '<30' },
  ]);
  const currentVideoLength = ref('');
  const quality = ref([
    { value: '', name: '全部' },
    { value: '1', name: '高清' },
  ]);
  const currentQuality = ref('');
  const produce = ref([
    { value: '', name: '全部' },
    { value: 'professional', name: '专业' },
    { value: 'homemade', name: '自制' },
  ]);
  const currentProduce = ref('');
  const { loadHistoryData, handleDelete, historyData, searchHistorySave } =
    useSearchHistory('pornhub');
  const imgClick = async (item) => {
    const { jumpUrl } = item;
    const xvVideoInfo = await ph_f_getVideoInfo(jumpUrl);
    ghsPlayerRef.value.showWithTag(xvVideoInfo.urls, xvVideoInfo.title, 'm3u8');
  };
  const base_url = 'https://www.pornhub.com';
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
      return await ph_f_getPageInfo(html);
    },
    resolveSearch: (value: string) => {
      searchHistorySave(value);
      return `${base_url}/video/search?search=${value}`;
    },
    resolveImgClick: imgClick,
    resolvePageUrl: (url) => {
      const $url = new URL(url);
      if (currentSorts.value) {
        const split = currentSorts.value.split(',');
        split.forEach((item) => {
          const as = item.split('=');
          if (as.length === 2) {
            $url.searchParams.set(as[0], as[1]);
          }
        });
      } else {
        $url.searchParams.delete('o');
        $url.searchParams.delete('cc');
      }
      if (currentVideoLength.value) {
        $url.searchParams.set('max_duration', currentVideoLength.value);
      } else {
        $url.searchParams.delete('max_duration');
      }
      if (currentQuality.value) {
        $url.searchParams.set('hd', currentQuality.value);
      } else {
        $url.searchParams.delete('hd');
      }
      if (currentProduce.value) {
        $url.searchParams.set('p', currentProduce.value);
      } else {
        $url.searchParams.delete('p');
      }

      return $url.toString();
    },
  });
  const { collect_save, collect_delete, collect_click, cCollect, collect_list } =
    useCollect('pornhub');
  onMounted(async () => {
    await load(base_url);
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
  watch(currentProduce, () => {
    load(currentUrl.value);
  });
</script>

<style scoped lang="less"></style>
