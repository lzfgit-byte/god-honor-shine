<template>
  <ViewLayout :key="webKey">
    <template #action>
      <div h-full w-full flex items-center justify-between>
        <a-button type="primary">Primary</a-button>
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
  const route = useRoute();
  const webKey = route.query.key as string;

  const { pagination, handlePageClick } = usePageState(webKey);

  onMounted(() => {
    console.log(webKey);
  });
</script>

<style scoped lang="less"></style>
