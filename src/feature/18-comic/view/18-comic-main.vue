<template>
  <component
    :is="currentCompoent"
    :details="detail_"
    :item="item_"
    :search-url="searchUrl"
    @to-content="handlerContent"
    @back="handlerBack"
    @search-comic="handlerSearch"
  ></component>
</template>

<script setup lang="ts">
  import { nextTick, ref, shallowRef } from 'vue';
  import type { content, detail } from '@/feature/18-comic/type/18-comic-type';

  import bus from '@/utils/bus';
  import ComicMain from '@/feature/18-comic/components/comic-main.vue';
  import ComicReader from '@/feature/18-comic/components/comic-reader.vue';
  import ComicSearch from '@/feature/18-comic/components/comic-search.vue';
  const lines: any[] = [];
  const reader = ref(false);
  const detail_ = ref();
  const item_ = ref();
  const currentCompoent = shallowRef<any>(ComicMain);
  const handlerContent = (detail: detail, item?: content) => {
    detail_.value = detail;
    reader.value = true;
    item_.value = item;
    lines.push(currentCompoent.value);
    currentCompoent.value = ComicReader;
  };
  const handlerBack = () => {
    if (lines.length === 0) {
      currentCompoent.value = ComicMain;
    } else {
      currentCompoent.value = lines.pop();
    }
  };
  const searchUrl = ref();
  const handlerSearch = (url: string) => {
    searchUrl.value = url;
    currentCompoent.value = '';
    nextTick(() => {
      currentCompoent.value = ComicSearch;
    });
  };
  bus.on('searchComic', (url) => {
    handlerSearch(`${url}`);
  });
</script>

<style scoped lang="less"></style>
