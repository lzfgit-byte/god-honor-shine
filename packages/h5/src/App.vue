<template>
  <van-config-provider>
    <router-view></router-view>
    <van-floating-bubble axis="xy" icon="chat" magnetic="x" />
  </van-config-provider>
</template>

<script setup lang="ts">
  import useInitData from '@/hook/useInitData';

  useInitData();
</script>
