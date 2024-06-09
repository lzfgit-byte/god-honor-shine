<template>
  <h1>Hello word</h1>
  <a-button v-for="(item, index) in configs" :key="item.key + index" @click="handleClick(item)">
    {{ item.name }}
  </a-button>
  {{ info }}
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import type { BaseConfig } from '@ghs/types';
  import { f_getMainPage, f_listAllWebConfigs } from '@/utils/business';

  const configs = ref<BaseConfig[]>([]);
  const info = ref();

  const handleClick = async (item: BaseConfig) => {
    info.value = await f_getMainPage(item.key);
    console.log(info.value);
  };

  onMounted(async () => {
    configs.value = await f_listAllWebConfigs();
  });
</script>

<style lang="less">
  @import '@/styles/style';
</style>
