<template>
  <div class="tag-item-container">
    {{ name || '单数' }}
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({ name: String });
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .tag-item-container {
    display: inline-flex;
    padding: 0px 5px;
    background-color: @global-secondary;
    color: @global-text-color;
    border: 1px solid @global-border-color;
    border-radius: 5px;
    margin: 0 5px 5px 0;
    cursor: pointer;
  }
</style>
