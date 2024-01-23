<template>
  <div relative flex-inline class="ghs-icon" h-4 w-4 :style="{ width, height }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({ height: String, width: String, color: String });
  const colorComp = computed(() => props.color || 'white');
</script>

<style scoped lang="less">
  .ghs-icon {
    color: v-bind(colorComp);
    cursor: pointer;
    &:hover {
      color: #8e8e8e;
    }
  }
</style>
