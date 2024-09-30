<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">收藏</van-tabbar-item>
    <van-tabbar-item icon="friends-o">历史</van-tabbar-item>
    <van-tabbar-item icon="setting-o">
      <TagsView :load="load" />
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import TagsView from '@/views/components/tags-view.vue';
  defineProps({ load: Function });

  const active = ref();
</script>

<style scoped lang="less"></style>
