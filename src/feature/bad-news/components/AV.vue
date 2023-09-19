<template>
  <Pagination :pages="pages" @jump="handlerJump"></Pagination>
  <div class="porn-container">
    <Covers v-for="(item, index) in videos" :key="index" :video-info="item"></Covers>
  </div>
</template>
<script setup lang="ts">
  import Covers from '@/feature/bad-news/components/Covers.vue';
  import Pagination from '@/feature/bad-news/components/Pagination.vue';
  import usePornStateAV from '@/feature/bad-news/hooks/usePornStateAV';

  const { videos, pages, handlerJump } = usePornStateAV('https://bad.news/av');
</script>

<style scoped lang="less">
  .porn-container {
    height: 85vh;
    overflow: auto;
  }
</style>
