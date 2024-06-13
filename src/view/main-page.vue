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
      <div ref="bodyRef" h-full w-full overflow-auto relative>
        <transition-group
          name="custom-classes"
          enter-active-class="animate__animated animate__pulse"
        >
          <GhsItem
            v-for="(item, index) in items"
            :key="item.jumpUrl + index + generateKey()"
            :item="item"
            :width="webConfig?.imgWidth"
            :height="webConfig?.imgHeight"
            :collect-sequence="collects?.length"
            @img-click="showDetail(item)"
            @up-collect="updateCollects"
          ></GhsItem>
        </transition-group>
      </div>
    </template>
  </ViewLayout>
  <a-drawer
    v-model:open="drawerOpen"
    placement="right"
    :width="webConfig?.drawWidth"
    :header-style="{ display: 'none' }"
  >
    <a-segmented v-model:value="segmentedValue" :options="segmentedData" />
    <div h-85vh overflow-auto w-full m-t-4 p-t-4>
      <transition-group
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        duration="200"
      >
        <TagsView
          v-if="segmentedValue === '标签'"
          :key="webKey"
          :tags="tags"
          :load="load"
        ></TagsView>
        <CollectView
          v-if="segmentedValue === '收藏'"
          :key="webKey"
          v-model:collects="collects"
          :web-key="webKey"
          :web-config="webConfig"
          :show-detail="showDetail"
        ></CollectView>
        <HistoryView
          v-if="segmentedValue === '历史'"
          :key="webKey"
          :web-config="webConfig"
          :show-detail="showDetail"
          :up-collect="updateCollects"
        ></HistoryView>
        <SystemConfig
          v-if="segmentedValue === '系统配置'"
          :key="webKey"
          :web-config="webConfig"
          :dbpath="dbPath"
          :chose-db-path="setDbPath"
        ></SystemConfig>
        <LogView v-if="segmentedValue === '日志'" :key="webKey"></LogView>
      </transition-group>
    </div>
  </a-drawer>
  <FloatButtonGroup
    :handle-draw-open="handleDrawOpen"
    :clear-cache="clearCache"
    :cache-size="cacheSize"
    :mouse-enter="calcCacheSize"
  ></FloatButtonGroup>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { generateKey } from '@ilzf/utils';
  import { watch, watchEffect } from 'vue-demi';
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
  import SystemConfig from '@/view/components/system-config.vue';
  import LogView from '@/view/components/log-view.vue';
  import useGlobalState from '@/hooks/use-global-state';
  const route = useRoute();
  const {
    webKey,
    pagination,
    items,
    webConfig,
    tags,
    dbPath,
    segmentedValue,
    segmentedData,
    cacheSize,
  } = useGlobalState();
  webKey.value = route.query.key as string;

  const { handlePageClick, handleSearch, clearCache, setDbPath, calcCacheSize, load, init } =
    usePageState();
  const { showDetail, drawerOpen, handleDrawOpen } = useFeature();
  const { collects, updateCollects } = useCollect();
  watchEffect(() => {
    console.log(webKey.value);
    if (webKey.value) {
      console.log('webKey.value', webKey.value);
      load();
      init();
      updateCollects();
    }
  });
</script>

<style scoped lang="less"></style>
