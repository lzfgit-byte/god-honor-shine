<template>
  <div ref="rule34CRef" class="rule34Container">
    <div ref="containerRef" class="container">
      <div class="pagination">
        <div class="topBtn">
          <el-input
            v-model="drawer.searchValue"
            placeholder="Please input"
            style="height: 32px; padding-right: 10px"
            @keydown.enter="drawer.search"
          >
            <template #append>
              <el-button :icon="Search as any" @click="drawer.search" />
            </template>
          </el-input>
          <el-button type="primary" @click="reload">刷新</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button type="primary" @click="drawer.visible = true">标签</el-button>
        </div>
        <Rule34Pagination :page-infos="pages" @page-change="handlerPageChange"></Rule34Pagination>
      </div>
      <div class="pageInfos">
        <Rule34Card v-for="item in videos" :key="item" :video-d="item"></Rule34Card>
      </div>
    </div>
  </div>

  <el-drawer v-model="drawer.visible" title="标签">
    <div>
      <el-row>
        <el-tag>排序规则</el-tag>
        <el-radio-group v-model="drawer.defaultSort">
          <el-radio v-for="item in drawer.sortBy" :key="item" :value="item.value">{{
            item.name
          }}</el-radio>
        </el-radio-group>
      </el-row>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import type { mainPage, pageInfo, videoInfo } from '@/feature/rule34/type/rule34Type';
  import { nprogress } from '@/utils/nprogress';
  import Rule34Pagination from '@/feature/rule34/components/rule-34-pagination.vue';
  import Rule34Card from '@/feature/rule34/components/rule-34-card.vue';
  import { clearCache, getHtml } from '@/utils/functions';
  import { rule34_getRule34MainPage } from '@/feature/rule34/utils/functions';

  const rule34CRef = ref();
  const url = 'https://rule34video.com/latest-updates/1/';
  const videos = ref<videoInfo[]>([]);
  const pages = ref<pageInfo[]>([]);
  const currentUrl = ref(url);
  const load = (url: string) => {
    currentUrl.value = url;
    nprogress.start();
    getHtml(url)
      .then((res) => {
        return rule34_getRule34MainPage(res);
      })
      .then((res: mainPage) => {
        videos.value = res.videos as any;
        pages.value = res.pages as any;
        nprogress.done();
        rule34CRef.value.scrollTop = 0;
      });
  };
  load(url);
  const currentPage = ref();
  //
  const drawer = reactive<Record<string, any>>({
    visible: false,
    searchValue: '',
    sortBy: [
      { name: 'Latest', value: 'post_date' },
      { name: 'Most Viewed', value: 'video_viewed' },
      { name: 'Top Rated', value: 'rating' },
    ],
    defaultSort: 'post_date',
    search: () => {
      const searchUrl = `https://rule34video.com/search/${drawer.searchValue}/?sort_by=${drawer.defaultSort}`;
      load(searchUrl);
    },
  });
  const handlerPageChange = (url: string, page: string) => {
    if (url === 'https://rule34video.com#search') {
      currentPage.value = page;
      const url = `https://rule34video.com/search/${drawer.searchValue}/?mode=async&function=get_block&block_id=custom_list_videos_videos_list_search&q=${drawer.searchValue}&sort_by=${drawer.defaultSort}&from_videos=${page}&from_albums=${page}`;
      load(url);
      return;
    }
    load(url);
  };

  watch(
    () => drawer.defaultSort,
    () => {
      const searchUrl = `https://rule34video.com/search/${drawer.searchValue}/?sort_by=${drawer.defaultSort}`;
      const url = `https://rule34video.com/search/${drawer.searchValue}/?mode=async&function=get_block&block_id=custom_list_videos_videos_list_search&q=${drawer.searchValue}&sort_by=${drawer.defaultSort}&from_videos=${currentPage.value}&from_albums=${currentPage.value}`;
      if (currentUrl.value.includes('block_id')) {
        load(url);
      } else if (searchUrl.includes('sort_by')) {
        load(searchUrl);
      } else {
        load(currentUrl.value);
      }
    }
  );
  const reload = () => {
    clearCache(currentUrl.value).then(() => {
      load(currentUrl.value);
    });
  };
  const reset = () => {
    clearCache().then(() => {
      load(currentUrl.value);
    });
  };
</script>

<style scoped lang="less">
  .rule34Container {
    height: 100vh;
    overflow: auto;
    .container {
      background: #212b31;
      .pagination {
        position: fixed;
        z-index: 10;
        width: 100%;
      }
      .pageInfos {
        padding-top: 50px;
        min-height: 100vh;
      }
    }
  }
</style>
