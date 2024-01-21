<template>
  <div flex-inline class="ghs-s-con" items-center>
    <input v-model="value" class="ghs-search" h-full placeholder="请输入" />
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref('');
</script>

<style scoped lang="less">
  .ghs-s-con {
    line-height: 1rem;
  }
  .ghs-search {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    transition: border-color 0.3s;
    outline: none;
    &:focus {
      border-color: #409eff;
    }
  }
</style>
