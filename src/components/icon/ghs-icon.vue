<template>
  <div relative flex-inline="" h-4 w-4 :style="{ width, height }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  defineProps({ height: String, width: String });
</script>

<style scoped lang="less"></style>
