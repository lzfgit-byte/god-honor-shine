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
    <a style="position: relative; display: inline-block">
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
        @click="getDetail"
      /><span
        style="
          position: absolute;
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
    v-model="videoSet.visible"
    width="1050px"
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
  import { nprogress } from '@/utils/nprogress';
  import { getHtml } from '@/utils/functions';
  import { hw_getVideoInfo } from '@/feature/hentai-word/utils/hw-functions';
  import { updateMessage } from '@/common/useMsgTitle';
  const prop = defineProps({
    info: Object as PropType<mainHtml>,
  });
  const progressValue = ref(0);
  const hasShowProgress = ref(false);
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
  let allImgs: any[] = [];
  let viewerInstance: any = null;
  const getDetail = async (isFull = false) => {
    if (prop?.info?.type !== 'Video') {
      // const imgs = await getAllImg(isFull);
      // allImgs = [];
      // hasShowProgress.value = true;
      // progressValue.value = 0;
      // for (let i = 0; i < imgs.length; i++) {
      //   if (isFull) {
      //     allImgs.push({
      //       src: await getImgBase64(imgs[i].original),
      //       'data-source': imgs[i].original,
      //       alt: imgs[i].name,
      //     });
      //   } else {
      //     loadImgFile(imgs[i].zipUrl);
      //     allImgs.push({
      //       src: await getImgBase64(imgs[i].zipUrl),
      //       'data-source': imgs[i].zipUrl,
      //       alt: imgs[i].name,
      //     });
      //   }
      //   progressValue.value = +((i + 1) / imgs.length).toFixed(1) * 100;
      // }
      // hasShowProgress.value = false;
      // showImgs(allImgs);
    } else {
      // 视频
      nprogress.start();
      const html = await getHtml(prop?.info?.jumpUrl as string);

      const videoInfo: videoInfo = await hw_getVideoInfo(html);
      updateMessage(`视频地址：${videoInfo.videoSrc}`);
      videoSet.playVideo(videoInfo.videoSrc, videoInfo.tite);
      nprogress.done();
    }
  };
</script>
<style scoped lang="less">
  @import '@/feature/hentai-word/less/card-less';
</style>
