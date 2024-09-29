<template>
  <div v-for="item in items" :key="item.jumpUrl">
    <GhsImg :url="item.coverImg"></GhsImg>
  </div>
</template>
<script setup lang="ts">
  import usePageState from '@/hook/use-page-state';
  import GhsImg from '@/components/image/ghs-img.vue';

  const { items, pagination, handlePageClick, handleSearch } = usePageState();
</script>

<style scoped></style>
