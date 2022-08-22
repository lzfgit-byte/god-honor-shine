<template>
  <div class="btnContainer">
    <space>
      <input-search
        v-model:value="searchValue"
        placeholder="搜索"
        style="width: 250px"
        enter-button
        @search="handlerSarch"
      />
      <a-button type="primary" @click="back">返回</a-button>
      <a-button type="primary" @click="reset">刷新</a-button>
    </space>
    <tag
      v-for="item in pageInfos"
      :key="item"
      style="width: 30px; height: 30px; cursor: pointer"
      :color="item.isCurrent ? 'pink' : 'green'"
      @click="load(item.jumpUrl)"
      >{{ item.title }}</tag
    >
  </div>
  <spin :spinning="spinning">
    <card>
      <comic-cover
        v-for="item in imgs"
        :key="item"
        :cover-info="item"
        @to-content="handlerContent"
      ></comic-cover>
    </card>
  </spin>
</template>

<script setup lang="ts">
  import { comicFunc, httpFunc } from '@/18-comic/utils/get18ComicFunc';
  import { inject, ref } from 'vue';
  import { pageInfo, seaerchPageInfo } from '@/18-comic/type/18comicType';
  import ComicCover from '@/18-comic/components/comic-cover.vue';
  import { Card, InputSearch, Space, Spin, Tag, Button as AButton } from 'ant-design-vue';
  import { detail, HOME_URL } from '@/18-comic/type/18comicType';

  const props = defineProps({
    searchUrl: String,
  });
  const emits = defineEmits(['toContent', 'back']);
  const { getHtmlByNet } = httpFunc(inject);
  const { getSearchInfo, removeCache } = comicFunc(inject);
  const handlerContent = (detail: detail) => {
    emits('toContent', detail);
  };
  const imgs = ref();
  const spinning = ref(true);
  const pageInfos = ref<pageInfo[]>();
  const load = (url: string) => {
    spinning.value = true;
    getHtmlByNet(url)
      .then((res) => {
        return getSearchInfo(res);
      })
      .then((res: seaerchPageInfo) => {
        imgs.value = res.covers;
        spinning.value = false;
        pageInfos.value = res.pageInfos;
      });
  };
  load(props?.searchUrl || '');
  const reset = () => {
    removeCache(props?.searchUrl).then(() => {
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
  }
</style>
