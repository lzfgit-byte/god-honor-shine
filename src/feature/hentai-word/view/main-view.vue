<template>
  <h1>hentai-word</h1>
</template>
<script setup lang="ts">
  import { getHtml } from '@/utils/functions';

  const HENTAI_WORD_URL = 'https://thehentaiworld.com/?new';
  getHtml(HENTAI_WORD_URL).then((res) => {
    debugger;
  });
</script>

<style scoped lang="less"></style>
