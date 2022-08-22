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
  import { nextTick, ref } from 'vue';
  import { content, detail } from '@/18-comic/type/18comicType';
  import ComicMain from '@/18-comic/components/comic-main.vue';
  import ComicReader from '@/18-comic/components/comic-reader.vue';
  import ComicSearch from '@/18-comic/components/comic-search.vue';
  import bus from '@/utils/bus';
  const lines: any[] = [];
  const reader = ref(false);
  const detail_ = ref();
  const item_ = ref();
  const currentCompoent = ref<any>(ComicMain);
  const handlerContent = (detail: detail, item?: content) => {
    detail_.value = detail;
    reader.value = true;
    item_.value = item;
    lines.push(currentCompoent.value);
    currentCompoent.value = ComicReader;
  };
  const handlerBack = () => {
    if (lines.length == 0) {
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
    handlerSearch(url + '');
  });
</script>

<style scoped lang="less"></style>
