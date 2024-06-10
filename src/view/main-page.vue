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
    <template #body></template>
  </ViewLayout>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsPagination from '@/components/pagination/ghs-pagination.vue';
  import usePageState from '@/view/hook/usePageState';
  import Search from '@/components/search/search.vue';
  const route = useRoute();
  const webKey = route.query.key as string;

  const { pagination, handlePageClick } = usePageState(webKey);

  onMounted(() => {
    console.log(webKey);
  });
</script>

<style scoped lang="less"></style>
