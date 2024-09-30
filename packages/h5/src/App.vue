<template>
  <van-config-provider>
    <div class="app-container" overflow-auto>
      <div
        v-if="loading"
        w-full
        h-full
        flex
        absolute=""
        justify-center
        items-center
        z-8
        style="background: rgba(0, 0, 0, 0.74)"
      >
        <van-loading size="24" />
      </div>

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
  import useGlobalState from '@/hook/useGlobalState';
  const { imgViewerRef, videoGlobalRef } = useGlobalRef();
  const { loading } = useGlobalState();

  useInitData();
</script>
<style lang="less" scoped>
  .app-container {
    padding-top: 10px;
    position: relative;
  }
</style>
