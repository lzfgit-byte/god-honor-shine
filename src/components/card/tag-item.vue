<template>
  <NTag style="cursor: pointer"> {{ name }} </NTag>
</template>
<script setup lang="ts">
  import { NTag } from 'naive-ui';

  const props = defineProps({ name: String });
</script>

<style scoped lang="less">
  @import '@/styles/values';
</style>
