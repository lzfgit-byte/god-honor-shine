<template>
  <div class="header-container">
    <div class="btn-container">
      <el-button type="primary" plain @click="handlerJump">刷新</el-button>
      <el-button type="primary" plain @click="drawer = true">标签</el-button>
    </div>
    <Pagination :pages="pages" @jump="handlerJump"></Pagination>
  </div>
  <div class="porn-container">
    <Covers v-for="(item, index) in videos" :key="index" :video-info="item"></Covers>
  </div>
  <el-drawer v-model="drawer" title="标签" :with-header="false">
    <div v-for="(item, index) in tags" :key="index" class="tag-container">
      <el-tag type="warning" @click="handlerJump(item.url)">{{ item.name }}</el-tag>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
  import usePornState from '@/feature/bad-news/hooks/usePornState';
  import Covers from '@/feature/bad-news/components/Covers.vue';
  import Pagination from '@/feature/bad-news/components/Pagination.vue';
  import usePornTag from '@/feature/bad-news/hooks/usePornTag';

  const { videos, pages, handlerJump, tags } = usePornState('https://bad.news/tag/porn');
  const { drawer } = usePornTag();
</script>

<style scoped lang="less">
  @import '../less/pronLong';
</style>
