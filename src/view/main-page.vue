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
      <div ref="bodyRef" h-full w-full overflow-auto>
        <transition-group
          name="custom-classes"
          enter-active-class="animate__animated animate__pulse"
        >
          <GhsItem
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            :width="webConfig.imgWidth"
            :height="webConfig.imgHeight"
            @img-click="showDetail(item)"
          ></GhsItem>
        </transition-group>
      </div>
    </template>
  </ViewLayout>
  <a-drawer
    v-model:open="drawerOpen"
    placement="right"
    width="90vw"
    :header-style="{ display: 'none' }"
  >
    <a-segmented v-model:value="segmentedValue" :options="segmentedData" />
  </a-drawer>
  <a-float-button type="default" :style="{ right: '15px', top: '60px' }" @click="handleDrawOpen">
    <template #icon>
      <CarOutlined />
    </template>
  </a-float-button>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { CarOutlined } from '@ant-design/icons-vue';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import usePageState from '@/view/hook/usePageState';
  import Search from '@/components/search/search.vue';
  import useFeature from '@/view/hook/useFeature';
  import GhsItem from '@/components/item/ghs-item.vue';
  const route = useRoute();
  const webKey = route.query.key as string;

  const { pagination, handlePageClick, items, webConfig, handleSearch } = usePageState(webKey);
  const { showDetail, drawerOpen, handleDrawOpen, segmentedValue, segmentedData } = useFeature();
</script>

<style scoped lang="less"></style>
