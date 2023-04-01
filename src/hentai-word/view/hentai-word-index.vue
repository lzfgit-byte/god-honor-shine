<template>
  <div class="container">
    <div class="floatBall" @click="handlerBallClick"></div>
    <div class="head">
      <a-spin :spinning="isSpinning">
        <hentai-word-card v-for="item in infos" :key="item" :info="item"></hentai-word-card>
      </a-spin>
    </div>
    <div class="pagination">
      <pagination-hentai-word
        :page-infos="pageInfos"
        @change-page="handlerChangePage"
      ></pagination-hentai-word>
    </div>
  </div>
  <a-drawer
    v-model:visible="drawer.visible"
    class="custom-class"
    style="color: red"
    title="搜索与标签"
    placement="right"
  >
    <div>
      <val-row>
        <a-tag color="pink">{{ cacheDir }}</a-tag></val-row
      >
      <a-row>
        <a-col :span="24">
          <a-space>
            <a-input-search
              v-model:value="drawer.searchValue"
              placeholder="输入关键字"
              @search="drawer.search"
            />
            <a-button @click="reload">刷新</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-row>
        <a-tag
          v-for="item in tags_"
          :key="item"
          style="margin: 5px; cursor: pointer"
          color="orange"
          @click="handlerTagClick(item.jumpUrl)"
          >{{ item.tageName + ' ' + item.count }}</a-tag
        >
      </a-row>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Row as ARow, InputSearch as AInputSearch, Button as AButton } from 'ant-design-vue';
  import { Col as ACol, Tag as ATag, Space as ASpace, Drawer as ADrawer } from 'ant-design-vue';
  import { Spin as ASpin } from 'ant-design-vue';
  import { htmlInfo, mainHtml, tags } from '@/hentai-word/type/hentai-word-type';
  import HentaiWordCard from '@/hentai-word/components/hentai-word-card.vue';
  import PaginationHentaiWord from '@/hentai-word/components/pagination-hentai-word.vue';
  import { exportFunc } from '@/utils/ipc';
  const { getHtmlAxios, getHtmlInfo, clearCache, getCacheDir, removeCache } = exportFunc;
  const TEXT_URL = 'https://thehentaiworld.com/?new';
  let currentUrl = '';
  const infos = ref<[x: mainHtml]>();
  const pageInfos = ref();
  const tags_ = ref<tags[]>();
  const handlerChangePage = (url: string) => {
    loadPage(url);
  };

  const isSpinning = ref(true);
  const loadPage = (url: string) => {
    isSpinning.value = true;
    currentUrl = url;
    getHtmlAxios(url)
      .then((res: string) => {
        return getHtmlInfo(res);
      })
      .then((res: htmlInfo) => {
        infos.value = res.mainHtml;
        pageInfos.value = res.pageInfo;
        tags_.value = res.tags;
        isSpinning.value = false;
      });
  };
  loadPage(TEXT_URL);
  const drawer = reactive({
    visible: false,
    searchValue: '',
    search: () => {
      const sarchVal = drawer.searchValue.replaceAll(' ', '+');
      const searchUrl = `https://thehentaiworld.com/?s=${sarchVal}`;
      loadPage(searchUrl);
    },
  });
  const handlerBallClick = () => {
    drawer.visible = true;
  };
  const handlerTagClick = (url: string) => {
    loadPage(url);
  };
  const reload = () => {
    removeCache(currentUrl).then(() => {
      loadPage(currentUrl);
    });
  };
  const reset = () => {
    clearCache().then(() => {
      loadPage(currentUrl);
    });
  };
  const cacheDir = ref();
  getCacheDir().then((res: string) => {
    cacheDir.value = res;
  });
</script>

<style scoped lang="less">
  .container {
    text-align: center;
    margin-top: 2px;
    width: 98vw;
    height: 98vh;
  }
  .floatBall {
    position: fixed;
    border: 16px solid #16d05f;
    right: 10px;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
  }
</style>
