<template>
  <p>{{ html }}</p>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { getHtml } from '@/utils/functions';
  import { hw_getHtmlInfo } from '@/feature/hentai-word/utils/hw-functions';

  const HENTAI_WORD_URL = 'https://thehentaiworld.com/?new';
  const html = ref('');
  getHtml(HENTAI_WORD_URL).then((res) => {
    hw_getHtmlInfo(res).then((res) => {
      console.log(res);
    });
  });
</script>

<style scoped lang="less"></style>
