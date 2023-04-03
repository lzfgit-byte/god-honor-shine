<template>
  <div class="container">
    <div class="pagination">
      <rule34-pagination :page-infos="pages"></rule34-pagination>
    </div>
    <div class="pageInfos">
      <rule34-card v-for="item in videos" :key="item" :video-d="item"></rule34-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getHtmlByNet, getRule34MainPage } from '@/rule34/http/http';
  import { mainPage, pageInfo, videoInfo } from '@/rule34/type/rule34Type';
  import Rule34Card from '@/rule34/component/rule-34-card.vue';
  import Rule34Pagination from '@/rule34/component/rule-34-pagination.vue';
  const url = 'https://rule34video.com/';
  const videos = ref<videoInfo[]>([]);
  const pages = ref<pageInfo[]>([]);
  getHtmlByNet(url)
    .then((res) => {
      return getRule34MainPage(res);
    })
    .then((res: mainPage) => {
      videos.value = res.videos as any;
      pages.value = res.pages as any;
    });
</script>

<style scoped lang="less">
  .container {
    background: #212b31;
    .pagination {
      position: fixed;
      z-index: 10;
      width: 100%;
    }
    .pageInfos {
      padding-top: 50px;
    }
  }
</style>
