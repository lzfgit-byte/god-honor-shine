<template>
  <div class="thumb" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div
      v-if="info?.type !== 'Video'"
      class="shadow"
      :class="{ hideShadow: !hasShow, showShadow: hasShow }"
    >
      <div class="topBtn">
        <el-button type="primary" shape="round" size="large"> default </el-button>
      </div>
      <div class="botBtn">
        <el-button type="primary" shape="round" size="large"> fullSize </el-button>
      </div>
    </div>
    <a v-loading="isSpinning" style="position: relative">
      <div v-show="hasShowProgress" class="progress">
        <el-progress type="circle" :percent="progressValue"
      /></div>
      <h4>{{ info.type }}</h4>
      <img
        itemprop="thumbnail"
        class="border"
        :src="imgBase64"
        :width="info?.width"
        :height="info?.height"
        :title="info?.title"
      /><span
        style="
          position: absolute;
          bottom: -61px;
          right: 5px;
          background: #fff;
          color: black;
          padding: 3px;
          border-radius: 4px 0 0 0;
          font-weight: 700;
        "
        >{{ info.count }}</span
      ></a
    >
  </div>
  <el-dialog
    :visible="videoSet.visible"
    width="1050px"
    style="top: 5px"
    :title="videoSet.videoTitle"
    @cancel="videoSet.visible = false"
    @ok="videoSet.visible = false"
  >
    <VideoHtml5
      v-if="videoSet.visible"
      :title="videoSet.videoTitle"
      :src="videoSet.videoSrc"
    ></VideoHtml5>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { defineProps, reactive, ref } from 'vue';
  import { api as viewerApi } from 'v-viewer';
  import type { imgInfo, mainHtml, videoInfo } from '@/feature/hentai-word/type/hw-types';
  import 'viewerjs/dist/viewer.css';
  import VideoHtml5 from '@/components/video-html5.vue';
  import { getImgUrl } from '@/utils/kit-utils';
  const prop = defineProps({
    info: Object as PropType<mainHtml>,
  });
  const isSpinning = ref(true);
  const progressValue = ref(0);
  const hasShowProgress = ref(false);
  console.log('--->', getImgUrl(prop?.info?.coverUrl as any));
  const imgBase64 = ref(getImgUrl(prop?.info?.coverUrl as any));
  const videoSet = reactive({
    visible: false,
    videoTitle: '',
    videoSrc: '',
    playVideo: (src: string, title = '') => {
      videoSet.videoSrc = src;
      videoSet.videoTitle = title;
      videoSet.visible = true;
    },
  });
  const hasShow = ref(false);
  const mouseenter = () => {
    hasShow.value = true;
  };
  const mouseleave = () => {
    hasShow.value = false;
  };
</script>
<style scoped lang="less">
  @import '@/feature/hentai-word/less/card-less';
</style>
