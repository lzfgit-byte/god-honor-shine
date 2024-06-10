<template>
  <MainLayout>
    <router-view></router-view>
  </MainLayout>
  <GhsMenu></GhsMenu>
</template>
<script setup lang="ts">
  import GhsMenu from '@/components/menu/ghs-menu.vue';
  import MainLayout from '@/components/layout/main-layout.vue';
</script>

<style lang="less">
  @import '@/styles/style';
</style>
