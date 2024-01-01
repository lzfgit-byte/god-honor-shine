<template>
  <div class="container">
    <div class="pagination">
      <div class="topBtn">
        <el-input
          v-model="searchValue"
          placeholder="Please input"
          style="height: 32px; padding-right: 10px"
          @keydown.enter="handlerSearch"
        >
          <template #append>
            <el-button :icon="Search as any" @click="handlerSearch" />
          </template>
        </el-input>
        <el-button type="primary" plain @click="refresh">刷新</el-button>
        <el-button type="primary" plain @click="reset">重置</el-button>
        <el-button type="primary" plain @click="drawerVisable = true">标签</el-button>
      </div>
      <PaginationHentaiWord
        :page-infos="pageInfos"
        @change-page="handlerChangePage"
      ></PaginationHentaiWord>
    </div>
    <div class="body">
      <HentaiWordCard v-for="item in infos" :key="item.jumpUrl" :info="item"></HentaiWordCard>
    </div>
  </div>
  <el-drawer v-model="drawerVisable" title="标签">
    <div>
      <el-tag
        v-for="item in tags_"
        :key="item"
        style="margin: 5px; cursor: pointer"
        class="ml-2"
        type="warning"
        @click="handlerTagClick(item.jumpUrl)"
      >
        {{ `${item.tageName} ${item.count}` }}
      </el-tag>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { f_clearCache as clearCache, f_getHtml as getHtml } from '@/utils/functions';
  import { hw_getHtmlInfo } from '@/feature/hentai-word/utils/hw-functions';
  import type { mainHtml, pageInfo, tags } from '@/feature/hentai-word/type/hw-types';
  import PaginationHentaiWord from '@/feature/hentai-word/components/pagination-hentai-word.vue';
  import HentaiWordCard from '@/feature/hentai-word/components/hentai-word-card.vue';
  import { nprogress } from '@/utils/nprogress';
  import { emitMessage } from '@/utils/useMsgTitle';

  const HENTAI_WORD_URL = 'https://thehentaiworld.com/?new';
  const currentUrl = ref(HENTAI_WORD_URL);
  const infos = ref<[x: mainHtml]>();
  const pageInfos = ref<pageInfo[]>();
  const tags_ = ref<tags[]>();
  const loadPage = (url: string) => {
    currentUrl.value = url;
    nprogress.start();
    getHtml(url).then((res) => {
      hw_getHtmlInfo(res).then((res) => {
        infos.value = res.mainHtml;
        pageInfos.value = res.pageInfo;
        tags_.value = res.tags;
        nprogress.done();
        emitMessage(currentUrl.value);
      });
    });
  };
  loadPage(HENTAI_WORD_URL);

  const handlerChangePage = (url: string) => {
    loadPage(url);
  };
  const drawerVisable = ref(false);
  const searchValue = ref();
  const handlerSearch = () => {
    const sarchVal = searchValue.value.replaceAll(' ', '+');
    const searchUrl = `https://thehentaiworld.com/?s=${sarchVal}`;
    loadPage(searchUrl);
  };
  const refresh = () => {
    clearCache(currentUrl.value as any, 'html').then(() => {
      loadPage(currentUrl.value);
    });
  };
  const reset = () => {
    clearCache().then(() => {
      loadPage(currentUrl.value);
    });
  };
  const handlerTagClick = (url: string) => {
    loadPage(url);
  };
</script>

<style scoped lang="less">
  .container {
    .topBtn {
      display: flex;
      transform: translateY(10px);
      padding-right: 10px;
    }
    .pagination {
      display: flex;
      justify-content: right;
      position: fixed;
      top: 0;
      z-index: 2;
      background: white;
      width: 100vw;
      height: 57px;
      box-sizing: border-box;
      padding-right: 33px;
    }
    .body {
      display: inline-block;
      padding-top: 55px;
    }
  }
</style>
