<template>
  <div
    relative
    flex-inline
    class="ghs-icon"
    h-4
    w-4
    :style="{ width: width || size, height: height || size }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({ height: String, width: String, color: String, size: String });
  const colorComp = computed(() => props.color || 'black');
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
