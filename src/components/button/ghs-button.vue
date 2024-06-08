<template>
  <div
    flex-inline
    justify-center
    items-center
    cursor-pointer
    class="ghs-button"
    :class="{
      defaultClass: !type || type === 'default',
      buttonText: type === 'text',
      choseText: active,
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue';

  defineProps({ type: String as PropType<'default' | 'text'>, active: Boolean });
</script>

<style scoped lang="less">
  .ghs-button {
    color: #737478;
    background-color: white;
    border-radius: 4px;
    line-height: 16px;
    &:hover {
      background-color: #ecf5ff;
      color: #4fa6ff;
      border: 1px solid #c6e2ff;
    }
  }
  .defaultClass {
    padding: 5px 5px;
    border: 1px solid #dcdfe6;
    &:hover {
      border: 1px solid #c6e2ff;
    }
  }
  .buttonText {
    padding: 3px;
  }
  .choseText {
    background-color: #ecf5ff;
    color: #4fa6ff;
    border: 1px solid #c6e2ff;
  }
</style>
