<template>
  <MainViewLayout>
    <template #dock>
      <DockLayout />
    </template>
    <template #body> </template>
  </MainViewLayout>
</template>
<script setup lang="ts">
  import MainViewLayout from '@/layout/MainViewLayout.vue';
  import DockLayout from '@/components/dock/DockLayout.vue';
</script>

<style lang="less">
  @import '@/styles/style';
</style>
