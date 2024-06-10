<template>
  <a-select
    v-model:value="value"
    show-search
    size="small"
    style="width: 200px"
    :default-active-first-option="true"
    :show-arrow="false"
    :filter-option="false"
    :not-found-content="null"
    :options="data"
    clear-icon
    allow-clear
    @click="handleSearch(null)"
    @search="handleSearch"
    @change="handleChange"
  ></a-select>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { f_searchRecommend } from '@/utils/business';

  const emits = defineEmits(['search']);

  const value = ref();
  const data = ref<any[]>();

  const handleSearch = async (val: string) => {
    const strs = await f_searchRecommend(val);
    data.value = strs.map((key) => ({ value: key }));
  };
  const handleChange = (val: string) => {
    emits('search', val);
    value.value = val;
  };
</script>

<style scoped lang="less"></style>
