<template>
  <div flex-inline class="ghs-s-con" items-center relative>
    <input
      v-model="value"
      class="ghs-search"
      h-full
      placeholder="请输入"
      h-4
      @keydown.enter="handleEnterClick"
    />
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const emits = defineEmits(['search']);
  const value = ref('');
  const handleEnterClick = () => {
    emits('search', value.value);
  };
</script>

<style scoped lang="less">
  .ghs-s-con {
  }
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
