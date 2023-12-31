<template>
  <div style="margin-top: 41px">
    <div class="btnContainer">
      <el-space>
        <el-input
          v-model="searchValue"
          placeholder="搜索"
          style="height: 32px; padding-right: 10px"
          @keydown.enter="handlerSarch"
        />
        <el-button type="primary" @click="reset">刷新</el-button>
        <el-button type="primary" @click="removeCacheAll_">清除缓存</el-button>
        <el-button type="primary" @click="showStore">阅读记录</el-button>
        <el-button type="primary" @click="byTagsVisable = true">分类查询</el-button>
      </el-space>
    </div>
    <el-card>
      <template #header> 连载更新 </template>
      <div class="coverContainer">
        <ComicCover
          v-for="item in serialLatest"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></ComicCover>
      </div>
    </el-card>
    <el-card>
      <template #header> 最新韩漫 </template>
      <div class="coverContainer">
        <ComicCover
          v-for="item in latestKoreanComic"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></ComicCover>
      </div>
    </el-card>
    <el-card>
      <template #header> 推荐 </template>
      <div class="coverContainer">
        <ComicCover
          v-for="item in recommend"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></ComicCover>
      </div>
    </el-card>
    <el-card>
      <template #header> 最新本子 </template>
      <div class="coverContainer">
        <ComicCover
          v-for="item in latest"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></ComicCover>
      </div>
    </el-card>
  </div>

  <el-dialog v-model="storeVisable" title="阅读记录" width="600px" @ok="storeVisable = false">
    <div class="recoderContainer">
      <span
        v-for="(item, index) in history"
        :key="item?.item?.jumpUrl"
        class="rowRecord"
        :title="item.detail?.title"
        @click="handlerContent(item?.detail as detail, item?.item)"
        >{{
          (item?.detail?.title?.length as any) > 20
            ? item?.detail?.title?.substring(0, 20)
            : item?.detail?.title
        }}
        / {{ item?.item?.title }}

        <el-text type="primary" @click.stop="removeOne(item?.item?.jumpUrl as string, index)"
          >删除</el-text
        >
        <el-text type="primary" plain @click.stop="handlerSarch(item.detail?.title as setting)">
          搜索该书
        </el-text>
      </span>
    </div>
  </el-dialog>
  <el-dialog v-model="byTagsVisable" title="分类查询" width="600px" @ok="byTagsVisable = false">
    <div class="recoderContainer">
      <el-tag
        v-for="item in ComicTagsInfo"
        :key="item"
        style="cursor: pointer; margin: 5px"
        type="warning"
        @click="emits('searchComic', item.jumpUrl)"
      >
        {{ item.title }}
      </el-tag>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, toRaw } from 'vue';
  import ComicCover from '@/feature/18-comic/components/comic-cover.vue';
  import {
    COMIC_HISTORY_KEY,
    ComicTagsInfo,
    HOME_URL,
  } from '@/feature/18-comic/type/18-comic-type';
  import type {
    content,
    detail,
    homeInfo,
    setWrapper,
    setting,
  } from '@/feature/18-comic/type/18-comic-type';
  import { clearCache, getHtmlByWin, getSetting, setSetting } from '@/utils/functions';
  import { comic_getHomeInfo } from '@/feature/18-comic/utils/functions';
  import { nprogress } from '@/utils/nprogress';

  const emits = defineEmits(['toContent', 'searchComic']);
  // 连载更新
  const serialLatest = ref();
  // 最新韩漫
  const latestKoreanComic = ref();
  // 推荐
  const recommend = ref();
  // 最新本子
  const latest = ref();

  const load = () => {
    nprogress.start();
    getHtmlByWin(HOME_URL)
      .then((res) => {
        return comic_getHomeInfo(res);
      })
      .then((res: homeInfo) => {
        serialLatest.value = res.serialLatest;
        latestKoreanComic.value = res.latestKoreanComic;
        recommend.value = res.recommend;
        latest.value = res.latest;
        nprogress.done();
      });
  };
  load();
  const removeCacheAll_ = () => {
    clearCache().then(() => {
      load();
    });
  };
  const handlerContent = (detail: detail, item?: content) => {
    emits('toContent', detail, item);
  };
  const reset = () => {
    clearCache(HOME_URL as any, 'html');
    load();
  };
  const searchValue = ref();
  const handlerSarch = (value?: setting) => {
    const searchUrl = `${HOME_URL}search/photos?main_tag=0&search_query=${
      searchValue.value || value
    }`;
    emits('searchComic', searchUrl);
  };
  const storeVisable = ref(false);
  const history = ref<setting[]>();
  const showStore = async () => {
    storeVisable.value = true;
    const set = await getSetting(COMIC_HISTORY_KEY);
    if (!set) {
      history.value = [];
      return;
    }
    const setJson: setWrapper = JSON.parse(set);
    history.value = setJson.array?.reverse();
  };
  const removeOne = (url: string, index: any) => {
    history.value = (history.value as setting[])?.filter((item: setting) => {
      return item.item?.jumpUrl !== url;
    });
    setSetting(COMIC_HISTORY_KEY, JSON.stringify({ array: toRaw(history.value) }));
  };
  const byTagsVisable = ref(false);
</script>

<style scoped lang="less">
  .coverContainer {
    text-align: center;
  }
  :deep(.ant-card-body) {
    margin: 0;
    padding: 0;
  }
  :deep(.ant-btn-link) {
    padding-right: 2px;
  }
  .btnContainer {
    position: fixed;
    right: 10px;
    z-index: 2;
    top: 0;
    background-color: white;
    width: 100%;
    height: 38px;
    display: flex;
    justify-content: right;
  }
  .recoderContainer {
    max-height: 500px;
    overflow: auto;
    .rowRecord {
      width: 90%;
      cursor: pointer;
      border: 1px solid #cccccc;
      margin: 5px;
      line-height: 32px;
      display: inline-block;
      &:hover {
        color: blue;
      }
      .rowBtn {
        float: right;
        display: inline;
      }
    }
  }
</style>
