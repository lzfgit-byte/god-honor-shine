<template>
  <div class="menu">
    <MenuGhs></MenuGhs>
  </div>
  <router-view></router-view>
</template>
<script setup lang="ts">
  import useMsgTitle from '@/common/useMsgTitle';
  import MenuGhs from '@/components/menu-ghs.vue';
  import { getLogs } from '@/utils/functions';
  useMsgTitle();
  getLogs().then((res) => {
    debugger;
  });
</script>

<style lang="less">
  @import 'style';
</style>
