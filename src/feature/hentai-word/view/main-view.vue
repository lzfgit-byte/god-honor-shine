<template>
  <div class="container">
    <div class="head">
      <HentaiWordCard v-for="item in infos" :key="item" :info="item"></HentaiWordCard>
    </div>
    <div class="pagination">
      <PaginationHentaiWord
        :page-infos="pageInfos"
        @change-page="handlerChangePage"
      ></PaginationHentaiWord>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { getHtml } from '@/utils/functions';
  import { hw_getHtmlInfo } from '@/feature/hentai-word/utils/hw-functions';
  import type { mainHtml, pageInfo, tags } from '@/feature/hentai-word/type/hw-types';
  import PaginationHentaiWord from '@/feature/hentai-word/components/pagination-hentai-word.vue';
  import HentaiWordCard from '@/feature/hentai-word/components/hentai-word-card.vue';
  import { nprogress } from '@/utils/nprogress';

  const HENTAI_WORD_URL = 'https://thehentaiworld.com/?new';
  const infos = ref<[x: mainHtml]>();
  const pageInfos = ref<pageInfo[]>();
  const tags_ = ref<tags[]>();
  const loadPage = (url: string) => {
    nprogress.start();
    getHtml(url).then((res) => {
      hw_getHtmlInfo(res).then((res) => {
        infos.value = res.mainHtml;
        pageInfos.value = res.pageInfo;
        tags_.value = res.tags;
        nprogress.done();
      });
    });
  };
  loadPage(HENTAI_WORD_URL);

  const handlerChangePage = (url: string) => {
    loadPage(url);
  };
</script>

<style scoped lang="less"></style>
