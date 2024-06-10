<template>
  <a-select
    v-model:value="value"
    show-search
    size="small"
    style="width: 200px"
    :default-active-first-option="false"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="data"
    clear-icon
    allow-clear
    @search="handleSearch"
    @change="handleChange"
  ></a-select>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const data = ref<any[]>([{ value: 22 }]);
  const value = ref();

  const handleSearch = (val: string) => {};
  const handleChange = (val: string) => {
    console.log(val);
    value.value = val;
  };
</script>

<style scoped lang="less"></style>
