<template>
  <div class="container">
    <div class="floatBall" @click="handlerBallClick"></div>
    <div class="pagination">
      <rule34-pagination :page-infos="pages" @page-change="handlerPageChange"></rule34-pagination>
    </div>
    <div class="pageInfos">
      <rule34-card v-for="item in videos" :key="item" :video-d="item"></rule34-card>
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
      <a-row> </a-row>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Row as ARow, InputSearch as AInputSearch, Button as AButton } from 'ant-design-vue';
  import { Col as ACol, Tag as ATag, Space as ASpace, Drawer as ADrawer } from 'ant-design-vue';
  import { clearCache, getHtmlByNet, getRule34MainPage } from '@/rule34/http/http';
  import { mainPage, pageInfo, videoInfo } from '@/rule34/type/rule34Type';
  import Rule34Card from '@/rule34/component/rule-34-card.vue';
  import Rule34Pagination from '@/rule34/component/rule-34-pagination.vue';
  import { progress } from '@/utils/npprogress';
  const url = 'https://rule34video.com/latest-updates/1/';
  const videos = ref<videoInfo[]>([]);
  const pages = ref<pageInfo[]>([]);
  const currentUrl = ref(url);
  const load = (url: string) => {
    currentUrl.value = url;
    progress.start();
    getHtmlByNet(url)
      .then((res) => {
        return getRule34MainPage(res);
      })
      .then((res: mainPage) => {
        videos.value = res.videos as any;
        pages.value = res.pages as any;
        progress.done();
      });
  };
  load(url);
  const handlerPageChange = (url: string, page: string) => {
    if (url === 'https://rule34video.com#search') {
      const url = `https://rule34video.com/search/${drawer.searchValue}/?mode=async&function=get_block&block_id=custom_list_videos_videos_list_search&q=${drawer.searchValue}&from_videos=${page}&from_albums=${page}`;
      load(url);
      return;
    }
    load(url);
  };
  //
  const drawer = reactive({
    visible: false,
    searchValue: '',
    search: () => {
      const searchUrl = `https://rule34video.com/search/${drawer.searchValue}/`;
      load(searchUrl);
    },
  });
  const reload = () => {
    clearCache().then(() => {
      load(currentUrl.value);
    });
  };
  const reset = () => {
    load(url);
  };
  const handlerBallClick = () => {
    drawer.visible = true;
  };
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
      min-height: 50vh;
    }
  }
  .floatBall {
    position: fixed;
    border: 16px solid #16d05f;
    right: 10px;
    border-radius: 50%;
    z-index: 11;
    cursor: pointer;
  }
</style>
