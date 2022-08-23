<template>
  <spin :spinning="spinning">
    <div class="btnContainer">
      <space>
        <input-search
          v-model:value="searchValue"
          placeholder="搜索"
          style="width: 250px"
          enter-button
          @search="handlerSarch"
        />
        <a-button type="primary" @click="reset">刷新</a-button>
        <a-button type="primary" @click="removeCacheAll_">清除缓存</a-button>
        <a-button type="primary" @click="showStore">阅读记录</a-button>
        <a-button type="primary" @click="byTagsVisable = true">分类查询</a-button>
      </space>
    </div>
    <card :title="'连载更新'">
      <div class="coverContainer">
        <comic-cover
          v-for="item in serialLatest"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></comic-cover>
      </div>
    </card>
    <card :title="'最新韩漫'">
      <div class="coverContainer">
        <comic-cover
          v-for="item in latestKoreanComic"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></comic-cover>
      </div>
    </card>
    <card :title="'推荐'">
      <div class="coverContainer">
        <comic-cover
          v-for="item in recommend"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></comic-cover>
      </div>
    </card>
    <card :title="'最新本子'">
      <div class="coverContainer">
        <comic-cover
          v-for="item in latest"
          :key="item"
          :cover-info="item"
          @to-content="handlerContent"
        ></comic-cover>
      </div>
    </card>
  </spin>

  <modal v-model:visible="storeVisable" title="阅读记录" width="600px" @ok="storeVisable = false">
    <div class="recoderContainer">
      <span
        v-for="(item, index) in history"
        :key="item"
        class="rowRecord"
        :title="item.detail.title"
        @click="handlerContent(item.detail, item.item)"
        >{{
          item.detail.title.length > 20 ? item.detail.title.substring(0, 20) : item.detail.title
        }}
        / {{ item.item.title }}

        <a-button class="rowBtn" type="link" @click.stop="removeOne(item.item.jumpUrl, index)"
          >删除</a-button
        >
        <a-button class="rowBtn" type="link" @click.stop="handlerSarch(item.detail.title)">
          搜索该书
        </a-button>
      </span>
    </div>
  </modal>
  <modal v-model:visible="byTagsVisable" title="分类查询" width="600px" @ok="byTagsVisable = false">
    <div class="recoderContainer">
      <tag
        v-for="item in ComicTagsInfo"
        :key="item"
        style="cursor: pointer; margin: 5px"
        color="orange"
        @click="emits('searchComic', item.jumpUrl)"
        >{{ item.title }}</tag
      >
    </div>
  </modal>
</template>

<script setup lang="ts">
  import { comicFunc, httpFunc, getSettingFunc } from '@/18-comic/utils/get18ComicFunc';
  import { inject, ref, toRaw } from 'vue';
  import ComicCover from '@/18-comic/components/comic-cover.vue';
  import { Card, Button as AButton, InputSearch, Space, Spin, Modal, Tag } from 'ant-design-vue';
  import { homeInfo, HOME_URL, setWrapper, setting, content } from '@/18-comic/type/18comicType';
  import type { detail } from '@/18-comic/type/18comicType';
  import { COMIC_HISTORY_KEY } from '@/18-comic/type/18comicType';
  import { ComicTagsInfo } from '@/18-comic/type/18comicType';

  const { getHtmlByNet } = httpFunc(inject);
  const { getHomeInfo, removeCacheAll, removeCache } = comicFunc();
  const { getSetting, setSetting } = getSettingFunc();
  const emits = defineEmits(['toContent', 'searchComic']);
  //连载更新
  const serialLatest = ref();
  //最新韩漫
  const latestKoreanComic = ref();
  //推荐
  const recommend = ref();
  //最新本子
  const latest = ref();
  const spinning = ref(true);

  const load = () => {
    spinning.value = true;
    getHtmlByNet(HOME_URL)
      .then((res) => {
        return getHomeInfo(res);
      })
      .then((res: homeInfo) => {
        serialLatest.value = res.serialLatest;
        latestKoreanComic.value = res.latestKoreanComic;
        recommend.value = res.recommend;
        latest.value = res.latest;
        spinning.value = false;
      });
  };
  load();
  const removeCacheAll_ = () => {
    removeCacheAll().then(() => {
      load();
    });
  };
  const handlerContent = (detail: detail, item?: content) => {
    emits('toContent', detail, item);
  };
  const reset = () => {
    removeCache(HOME_URL);
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
    history.value = history.value?.filter((item: setting, index_) => {
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
