<template>
  <MainViewLayout>
    <template #dock>
      <DockLayout />
    </template>
  </MainViewLayout>
</template>
<script setup lang="ts">
  import MainViewLayout from '@/layout/MainViewLayout.vue';
  import DockLayout from '@/components/dock/DockLayout.vue';
  import { f_requestHtml } from '@/utils/functions';
</script>

<style lang="less">
  @import '@/styles/style';
</style>
