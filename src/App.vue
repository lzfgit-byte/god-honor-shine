<template>
  <MainViewLayout>
    <template #dock>
      <DockLayout />
    </template>
    <template #body> </template>
    <template #setting>
      <SettingLayout />
    </template>
  </MainViewLayout>
</template>
<script setup lang="ts">
  import MainViewLayout from '@/layout/main-view-layout.vue';
  import DockLayout from '@/components/dock/dock-layout.vue';
  import SettingLayout from '@/components/setting/setting-layout.vue';
</script>

<style lang="less">
  @import '@/styles/style';
</style>
