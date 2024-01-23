<template>
  <div relative flex-inline class="ghs-icon" h-4 w-4 :style="{ width, height }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  defineProps({ height: String, width: String });
</script>

<style scoped lang="less">
  .ghs-icon {
    color: white;
    &:hover {
      color: #8e8e8e;
    }
  }
</style>
