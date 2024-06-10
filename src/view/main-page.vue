<template>
  <ViewLayout :key="webKey">
    <template #action>
      <div h-full w-full flex items-center justify-between>
        <div m-l-4>
          <Search @search="handleSearch"></Search>
        </div>
        <div>
          <GhsPagination :pagination="pagination" @click="handlePageClick"></GhsPagination>
        </div>
      </div>
    </template>
    <template #body>
      <a-spin :spinning="loading">
        <div ref="bodyRef" h-full w-full overflow-auto>
          <transition-group
            name="custom-classes"
            enter-active-class="animate__animated animate__pulse"
          >
            <GhsItem
              v-for="(item, index) in items"
              :key="item.jumpUrl + index + generateKey()"
              :item="item"
              :width="webConfig.imgWidth"
              :height="webConfig.imgHeight"
              :collect-sequence="collects?.length"
              @img-click="showDetail(item)"
              @up-collect="updateCollects"
            ></GhsItem>
          </transition-group>
        </div>
      </a-spin>
    </template>
  </ViewLayout>
  <a-drawer
    v-model:open="drawerOpen"
    placement="right"
    width="90vw"
    :header-style="{ display: 'none' }"
  >
    <a-segmented v-model:value="segmentedValue" :options="segmentedData" />
    <div h-full w-full m-t-4>
      <transition-group
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__slideOutDown"
      >
        <TagsView v-if="segmentedValue === '标签'" :key="webKey" :tags="tags"></TagsView>
        <CollectView
          v-if="segmentedValue === '收藏'"
          :key="webKey"
          v-model:collects="collects"
          :web-key="webKey"
          :web-config="webConfig"
          :show-detail="showDetail"
          :up-collect="updateCollects"
        ></CollectView>
        <HistoryView
          v-if="segmentedValue === '历史'"
          :key="webKey"
          :web-config="webConfig"
          :show-detail="showDetail"
        ></HistoryView>
      </transition-group>
    </div>
  </a-drawer>
  <FloatButtonGroup
    :handle-draw-open="handleDrawOpen"
    :clear-cache="clearCache"
    :cache-size="cacheSize"
    :db-path="dbPath"
    :chose-db-path="setDbPath"
    :mouse-enter="calcCacheSize"
  ></FloatButtonGroup>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { generateKey } from '@ilzf/utils';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import usePageState from '@/view/hook/use-page-state';
  import Search from '@/components/search/search.vue';
  import useFeature from '@/view/hook/use-feature';
  import GhsItem from '@/components/item/ghs-item.vue';
  import TagsView from '@/view/components/tags-view.vue';
  import CollectView from '@/view/components/collect-view.vue';
  import useCollect from '@/view/hook/use-collect';
  import HistoryView from '@/view/components/history-view.vue';
  import FloatButtonGroup from '@/view/components/float-button-group.vue';
  const route = useRoute();
  const webKey = route.query.key as string;

  const {
    pagination,
    handlePageClick,
    items,
    webConfig,
    handleSearch,
    tags,
    clearCache,
    cacheSize,
    dbPath,
    setDbPath,
    loading,
    calcCacheSize,
  } = usePageState(webKey);
  const { showDetail, drawerOpen, handleDrawOpen, segmentedValue, segmentedData } = useFeature();
  const { collects, updateCollects } = useCollect(webKey);
</script>

<style scoped lang="less"></style>
