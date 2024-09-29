<template>
  <van-config-provider>
    <div class="app-container" overflow-auto>
      <router-view></router-view>
    </div>
    <van-floating-bubble axis="xy" icon="chat" magnetic="x" />
    <GhsBottomMenus></GhsBottomMenus>
  </van-config-provider>
</template>

<script setup lang="ts">
  import useInitData from '@/hook/useInitData';
  import GhsBottomMenus from '@/components/bottom-menus/ghs-bottom-menus.vue';

  useInitData();
</script>
<style lang="less" scoped>
  .app-container {
    padding-top: 10px;
    height: calc(100vh - 60px);
  }
</style>
