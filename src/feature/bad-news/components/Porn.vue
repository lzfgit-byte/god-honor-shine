<template>
  <div class="porn-container">
    <Covers v-for="(item, index) in videos" :key="index" :video-info="item"></Covers>
  </div>
</template>
<script setup lang="ts">
  import usePornState from '@/feature/bad-news/hooks/usePornState';
  import Covers from '@/feature/bad-news/components/Covers.vue';

  const { videos } = usePornState();
</script>

<style scoped lang="less">
  .porn-container {
  }
</style>
