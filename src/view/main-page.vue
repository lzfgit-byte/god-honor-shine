<template>
  <ViewLayout :key="webKey">
    <template #action>
      <div h-full w-full flex items-center justify-between>
        <div m-l-4>
          <Search></Search>
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
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import usePageState from '@/view/hook/usePageState';
  import Search from '@/components/search/search.vue';
  import useFeature from '@/view/hook/useFeature';
  const route = useRoute();
  const webKey = route.query.key as string;

  const { pagination, handlePageClick, items, webConfig } = usePageState(webKey);
  const { showDetail } = useFeature();

  onMounted(() => {
    console.log(webKey);
  });
</script>

<style scoped lang="less"></style>
