<template>
  <van-config-provider>
    <div class="app-container" overflow-auto>
      <router-view></router-view>
    </div>
    <GhsPlayer ref="videoGlobalRef"></GhsPlayer>
  </van-config-provider>
</template>

<script setup lang="ts">
  import useInitData from '@/hook/useInitData';
  import GhsBottomMenus from '@/components/bottom-menus/ghs-bottom-menus.vue';
  import useGlobalRef from '@/hook/use-global-ref';
  import GhsPlayer from '@/components/player/ghs-player.vue';
  const { imgViewerRef, videoGlobalRef } = useGlobalRef();

  useInitData();
</script>
<style lang="less" scoped>
  .app-container {
    padding-top: 10px;
  }
</style>
