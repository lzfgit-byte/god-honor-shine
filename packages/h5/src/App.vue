<template>
  <van-config-provider>
    <router-view></router-view>
    <van-floating-bubble axis="xy" icon="chat" magnetic="x" />
    <GhsBottomMenus></GhsBottomMenus>
  </van-config-provider>
</template>

<script setup lang="ts">
  import useInitData from '@/hook/useInitData';
  import GhsBottomMenus from '@/components/bottom-menus/ghs-bottom-menus.vue';

  useInitData();
</script>
