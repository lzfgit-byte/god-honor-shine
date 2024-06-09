<template>
  <h1>Hello word</h1>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { f_listAllWebConfigs } from '@/utils/business';

  onMounted(async () => {
    const webConfig = await f_listAllWebConfigs();
    console.log(webConfig);
  });
</script>

<style lang="less">
  @import '@/styles/style';
</style>
