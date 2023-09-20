<template>
  <div class="bad-news-container">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="短视频" name="porn">
        <Porn v-if="activeName === 'porn'" url="https://bad.news/tag/porn"></Porn>
      </el-tab-pane>
      <el-tab-pane label="长视频" name="longPorn">
        <Porn v-if="activeName === 'longPorn'" url="https://bad.news/tag/long-porn"></Porn>
      </el-tab-pane>
      <el-tab-pane label="成人mv" name="av">
        <AV v-if="activeName === 'av'"></AV>
      </el-tab-pane>
      <el-tab-pane label="H动漫" name="dm">
        <DM v-if="activeName === 'dm'"></DM>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
  import useBadNewsState from '@/feature/bad-news/hooks/useBadNewsState';
  import Porn from '@/feature/bad-news/components/Porn.vue';
  import LongPorn from '@/feature/bad-news/components/LongPorn.vue';
  import AV from '@/feature/bad-news/components/AV.vue';
  import DM from '@/feature/bad-news/components/DM.vue';

  const { activeName } = useBadNewsState();
</script>

<style scoped lang="less"></style>
