<template>
  <h1>Hello word</h1>
  <a-button v-for="(item, index) in configs" :key="item.key + index" @click="handleClick(item)">
    {{ item.name }}
  </a-button>
  {{ info }}
  <a-input v-model:value="search" @keydown.enter="handleSearch"></a-input>
  <GhsMenu></GhsMenu>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import type { BaseConfig } from '@ghs/types';
  import { f_getPage, f_listAllWebConfigs, f_search } from '@/utils/business';
  import GhsMenu from '@/components/menu/ghs-menu.vue';

  const configs = ref<BaseConfig[]>([]);
  const info = ref();
  const handleClick = async (item: BaseConfig) => {
    info.value = await f_getPage(item.key);
    console.log(info.value);
  };

  const search = ref();
  const handleSearch = async () => {
    const s = await f_search(search.value);
    info.value = s;
    console.log(s);
  };

  onMounted(async () => {
    configs.value = await f_listAllWebConfigs();
  });
</script>

<style lang="less">
  @import '@/styles/style';
</style>
