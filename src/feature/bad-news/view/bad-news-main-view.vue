<template>
  <div class="bad-news-container">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="短视频" name="porn">
        <Porn v-if="activeName === 'porn'"></Porn>
      </el-tab-pane>
      <el-tab-pane label="长视频" name="longPorn">长视频</el-tab-pane>
      <el-tab-pane label="成人mv" name="av">成人mv</el-tab-pane>
      <el-tab-pane label="H动漫" name="dm">H动漫</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
  import useBadNewsState from '@/feature/bad-news/hooks/useBadNewsState';
  import Porn from '@/feature/bad-news/components/Porn.vue';

  const { activeName } = useBadNewsState();
</script>

<style scoped lang="less"></style>
