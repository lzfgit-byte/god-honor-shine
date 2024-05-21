<template>
  <input
    ref="inputRef"
    v-model="value_"
    class="ghs-search"
    h-full
    w-full
    placeholder="请输入"
    h-4
    v-bind="$attrs"
  />
</template>
<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  const props = defineProps({ value: String });
  const emits = defineEmits(['update:modelValue']);
  const value_ = useVModel(props, 'value', emits);
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .ghs-search {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.4rem;
    transition: border-color 0.3s;
    outline: none;
    &:focus {
      border-color: #409eff;
    }
  }
</style>
