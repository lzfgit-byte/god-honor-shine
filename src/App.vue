<template>
  <div class="menu">
    <MenuGhs></MenuGhs>
  </div>
  <div class="setting">
    <SettingGhs></SettingGhs>
  </div>
  <router-view></router-view>
</template>
<script setup lang="ts">
  import useMsgTitle from '@/common/useMsgTitle';
  import MenuGhs from '@/components/menu-ghs.vue';
  import SettingGhs from '@/components/setting-ghs.vue';
  useMsgTitle();
</script>

<style lang="less">
  @import 'style';
</style>
