<template>
  <div class="btnContainer">
    <el-space>
      <el-input
        v-model="searchValue"
        placeholder="搜索"
        style="height: 32px; padding-right: 10px"
        @keydown.enter="handlerSarch"
      >
        <template #append>
          <el-button :icon="Search as any" @click="handlerSarch" />
        </template>
      </el-input>
      <el-button type="primary" @click="back">返回</el-button>
      <el-button type="primary" @click="reset">刷新</el-button>
    </el-space>
    <el-tag
      v-for="item in pageInfos"
      :key="item"
      style="width: 30px; height: 30px; cursor: pointer; padding: 5px; margin: 5px"
      :type="item.isCurrent ? 'warning' : 'info'"
      @click="load(item?.jumpUrl as string)"
      >{{ item.title }}</el-tag
    >
  </div>
  <div>
    <el-card>
      <ComicCover
        v-for="item in imgs"
        :key="item"
        :cover-info="item"
        @to-content="handlerContent"
      ></ComicCover>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { HOME_URL } from '@/feature/18-comic/type/18-comic-type';
  import type { detail, pageInfo, searchPageInfo } from '@/feature/18-comic/type/18-comic-type';
  import { clearCache, getHtml } from '@/utils/functions';
  import { comic_getSearchInfo } from '@/feature/18-comic/utils/functions';
  import ComicCover from '@/feature/18-comic/components/comic-cover.vue';

  const props = defineProps({
    searchUrl: String,
  });
  const emits = defineEmits(['toContent', 'back']);
  const handlerContent = (detail: detail) => {
    emits('toContent', detail);
  };
  const imgs = ref();
  const spinning = ref(true);
  const pageInfos = ref<pageInfo[]>();
  const load = (url: string) => {
    spinning.value = true;
    getHtml(url)
      .then((res) => {
        return comic_getSearchInfo(res);
      })
      .then((res: searchPageInfo) => {
        imgs.value = res.covers;
        spinning.value = false;
        pageInfos.value = res.pageInfos;
      });
  };
  load(props?.searchUrl || '');
  const reset = () => {
    clearCache(props?.searchUrl as any).then(() => {
      load(props?.searchUrl || '');
    });
  };
  const searchValue = ref();
  const handlerSarch = () => {
    const searchUrl = `${HOME_URL}search/photos?main_tag=0&search_query=${searchValue.value}`;
    load(searchUrl);
  };
  const back = () => {
    emits('back');
  };
</script>

<style scoped lang="less">
  .btnContainer {
    position: fixed;
    right: 10px;
    z-index: 2;
    top: 0;
    background-color: white;
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: right;
  }
</style>
