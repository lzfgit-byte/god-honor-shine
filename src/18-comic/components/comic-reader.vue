<template>
  <card :title="''">
    <div class="btnContainer">
      <space>
        <a-input v-model:value="currentPage" />
        <a-button type="primary" @click="back">返回</a-button>
        <a-button type="primary" @click="contentVisable = true">显示目录</a-button>
        <a-button type="primary" @click="refresh">刷新</a-button>
        <a-button type="primary" @click="prev">上一话</a-button>
        <a-button type="primary" @click="next">下一话</a-button>
        <a-button type="primary" @click="ZoomIn">放大</a-button>
        <a-button type="primary" @click="ZoomOut">缩小</a-button>
      </space>
    </div>
    <spin :spinning="spinning">
      <div class="container">
        <comic-img
          v-for="item_ in imgs"
          :ref="setImgRefs"
          :key="item_"
          :aid="info_?.aid"
          :scramble-id="info_?.scramble_id"
          :src="item_.src"
        />
      </div>
    </spin>
  </card>

  <modal v-model:visible="contentVisable" title="目录" width="400px" @ok="contentVisable = false">
    <div class="des">
      {{ details?.des || '无' }}
    </div>
    <div class="content">
      <div
        v-for="item in details?.contents"
        :key="item"
        :class="{ row: true, current: item?.current }"
        @click.stop="doRead(item)"
      >
        <span>{{ item?.title }}</span>
      </div>
      <div
        v-if="details?.contents.length === 0"
        class="row current"
        @click.stop="doRead({ jumpUrl: details?.reading })"
      >
        <span>开始阅读</span>
      </div>
    </div>
  </modal>

  <back-top>
    <div class="ant-back-top-inner">UP</div>
  </back-top>
</template>

<script setup lang="ts">
  import type { content, detail, readImg, readImgInfo, setting } from '@/18-comic/type/18comicType';
  import { Modal, Card, Space, Button as AButton, Input as AInput } from 'ant-design-vue';
  import { Spin, BackTop } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { inject, ref } from 'vue';
  import { comicFunc, httpFunc, getSettingFunc } from '@/18-comic/utils/get18ComicFunc';
  import ComicImg from '@/18-comic/components/comic-img.vue';
  import { COMIC_HISTORY_KEY } from '@/18-comic/type/18comicType';

  const { getHtmlByNet } = httpFunc(inject);
  const { getReaderInfos } = comicFunc(inject);
  const { setSetting, getSetting } = getSettingFunc(inject);
  const props = defineProps({
    details: Object as PropType<detail>,
    item: Object as PropType<content>,
  });
  const spinning = ref(true);
  const emits = defineEmits(['back']);
  const imgs = ref<readImg[]>();
  const info_ = ref<readImgInfo>();
  const contentVisable = ref<boolean>(true);
  const currentPage = ref(1);
  const doRead = (item: content) => {
    spinning.value = true;
    props?.details?.contents?.forEach((item_, i) => {
      item_.current = false;
      if (item_.jumpUrl === item.jumpUrl) {
        currentPage.value = +i + 1;
      }
    });
    item.current !== undefined && (item.current = true);
    getHtmlByNet(item?.jumpUrl || '')
      .then((res) => {
        return getReaderInfos(res);
      })
      .then((info: readImgInfo) => {
        imgs.value = info.imgs;
        info_.value = info;
        contentVisable.value = false;
        spinning.value = false;
        setHistory({ detail: props.details, item });
      });
  };
  //设置阅读历史
  const setHistory = async (value: setting) => {
    let seting = await getSetting(COMIC_HISTORY_KEY);
    if (!seting) {
      setSetting(COMIC_HISTORY_KEY, JSON.stringify({ array: [value] }));
      return;
    }
    const array = JSON.parse(seting);
    let setings = array.array.filter((item: setting) => {
      return item.detail?.title !== value.detail?.title;
    });
    setings.push(value);
    // setSetting(COMIC_HISTORY_KEY, JSON.stringify({ array: setings }));
  };

  if (props.item && props.item.jumpUrl) {
    contentVisable.value = false;
    doRead(props.item);
  }
  if (String(props?.details?.des)?.trim()?.length < 5 && props?.details?.contents?.length === 0) {
    contentVisable.value = false;
    doRead({ jumpUrl: props?.details?.reading });
  }
  //前一话
  const prev = () => {
    const contents = props?.details?.contents || [];
    if (currentPage.value > 1 && contents.length > 0) {
      doRead(contents[currentPage.value - 2]);
    }
  };
  //下一话
  const next = () => {
    const contents = props?.details?.contents || [];
    if (currentPage.value < contents.length) {
      doRead(contents[currentPage.value]);
    }
  };
  //刷新
  const refresh = () => {
    const contents = props?.details?.contents || [];
    if (contents.length > 0) {
      doRead(contents[currentPage.value - 1]);
    } else {
      doRead({ jumpUrl: props?.details?.reading || '' });
    }
  };
  const back = () => {
    emits('back');
  };
  const imgRefs: any[] = [];
  const setImgRefs = (ref: any) => {
    if (ref) {
      imgRefs.push(ref);
    }
  };
  const ZoomIn = () => {
    imgRefs?.forEach((ref) => {
      ref.bigger();
    });
  };
  const ZoomOut = () => {
    imgRefs?.forEach((ref) => {
      ref.smaller();
    });
  };
</script>

<style scoped lang="less">
  .des {
    overflow: auto;
    max-height: 100px;
  }
  .content {
    margin-top: 10px;
    overflow: auto;
    height: 300px;
    .row {
      border: 1px solid #cccccc;
      height: 30px;
      display: flex;
      align-items: center;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
    .current {
      border-color: rgba(0, 0, 0, 0.66);
    }
  }
  .container {
    overflow: auto;
    text-align: center;
  }
  :deep(.ant-card-body) {
    margin: 0;
    padding: 0;
  }
  .btnContainer {
    position: fixed;
    z-index: 6;
    right: 10px;
  }
  .ant-back-top-inner {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
</style>
