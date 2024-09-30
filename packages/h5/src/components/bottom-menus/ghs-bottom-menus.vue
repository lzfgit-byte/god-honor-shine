<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">
      <CollectView :show-detail="showDetail" :up-collect="upCollect" />
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o">历史</van-tabbar-item>
    <van-tabbar-item icon="setting-o">
      <TagsView :load="load" />
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import TagsView from '@/views/components/tags-view.vue';
  import CollectView from '@/views/components/collect-view.vue';
  defineProps({ load: Function, showDetail: Function, upCollect: Function });

  const active = ref();
</script>

<style scoped lang="less"></style>
