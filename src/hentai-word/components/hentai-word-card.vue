<template>
  <div class="thumb" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div
      v-if="info.type !== 'Video'"
      :class="{ shadow: true, hideShadow: !hasShow, showShadow: hasShow }"
    >
      <div class="topBtn">
        <a-button type="primary" shape="round" :size="'large'" @click="getDetail(false)">
          default
        </a-button>
      </div>
      <div class="botBtn">
        <a-button type="primary" shape="round" :size="'large'" @click="getDetail(true)">
          fullSize
        </a-button>
      </div>
    </div>
    <a-spin style="display: inline" :spinning="isSpinning">
      <a style="position: relative">
        <div v-show="hasShowProgress" class="progress">
          <a-progress type="circle" :percent="progressValue"
        /></div>
        <h4>{{ info.type }}</h4>
        <img
          itemprop="thumbnail"
          class="border"
          :src="imgBase64"
          :width="info.width"
          :height="info.height"
          :title="info.title"
          @click="getDetail"
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
    </a-spin>
  </div>
  <a-modal
    :visible="videoSet.visible"
    width="1050px"
    style="top: 5px"
    :title="videoSet.videoTitle"
    @cancel="videoSet.visible = false"
    @ok="videoSet.visible = false"
  >
    <video-html5
      v-if="videoSet.visible"
      :title="videoSet.videoTitle"
      :src="videoSet.videoSrc"
    ></video-html5>
  </a-modal>
</template>

<script setup lang="ts">
  import { defineProps, PropType, ref, reactive } from 'vue';
  import { Progress as AProgress, Spin as ASpin, Modal as AModal } from 'ant-design-vue';
  import { imgInfo, mainHtml, videoInfo } from '@/hentai-word/type/hentai-word-type';
  import { getHentaiWordFunc } from '@/hentai-word/utils/hentai-word-func';
  import 'viewerjs/dist/viewer.css';
  import { Button as AButton } from 'ant-design-vue';
  import { api as viewerApi } from 'v-viewer';
  import VideoHtml5 from '@/components/video-html5.vue';
  const { getImgBase64, getHtmlAxios, getImgInfo } = getHentaiWordFunc();
  const { getImgInfoOnly, getVideoInfo, loadImgFile } = getHentaiWordFunc();
  const prop = defineProps({
    info: Object as PropType<mainHtml>,
  });
  const isSpinning = ref(true);
  const progressValue = ref(0);
  const hasShowProgress = ref(false);
  const imgBase64 = ref('');
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
  getImgBase64(prop?.info?.coverUrl)
    .then((res: string) => {
      imgBase64.value = res;
      isSpinning.value = false;
    })
    .catch((res: any) => {
      console.log(prop?.info?.coverUrl);
    });
  let allImgs: any[] = [];
  let viewerInstance: any = null;
  const getDetail = async (isFull = false) => {
    if (prop?.info?.type !== 'Video') {
      isSpinning.value = true;
      const imgs = await getAllImg(isFull);
      isSpinning.value = false;
      allImgs = [];
      hasShowProgress.value = true;
      progressValue.value = 0;
      for (let i = 0; i < imgs.length; i++) {
        if (isFull) {
          allImgs.push({
            src: await getImgBase64(imgs[i].original),
            'data-source': imgs[i].original,
            alt: imgs[i].name,
          });
        } else {
          loadImgFile(imgs[i].zipUrl);
          allImgs.push({
            src: await getImgBase64(imgs[i].zipUrl),
            'data-source': imgs[i].zipUrl,
            alt: imgs[i].name,
          });
        }
        progressValue.value = +((i + 1) / imgs.length).toFixed(1) * 100;
      }
      hasShowProgress.value = false;
      showImgs(allImgs);
    } else {
      isSpinning.value = true;
      const html = await getHtmlAxios(prop?.info?.jumpUrl);
      const videoInfo: videoInfo = await getVideoInfo(html);
      videoSet.playVideo(videoInfo.videoSrc, videoInfo.tite);
      isSpinning.value = false;
    }
  };
  const showImgs = (allImgs: any) => {
    if (viewerInstance === null) {
      viewerInstance = viewerApi({
        options: {
          url: (image: any) => {
            return image.src;
          },
          hidden: () => {
            viewerInstance = null;
          },
        },
        images: allImgs,
      });
    }
  };
  const getImgInfoByThumb = async (url: string) => {
    const html = await getHtmlAxios(url);
    const imgInfo: imgInfo = await getImgInfoOnly(html);
    return imgInfo;
  };
  const getAllImg = async (isFull = false) => {
    const res = [];
    const html = await getHtmlAxios((prop as any).info.jumpUrl);
    const imgInfo: imgInfo = await getImgInfo(html);
    isFull ? loadImgFile(imgInfo.original) : imgInfo;
    res.push(imgInfo);
    const allCount = imgInfo.others?.length || 0;
    for (let i = 0; i < allCount; i++) {
      if (imgInfo.others === undefined) {
        continue;
      }
      const imgOne = imgInfo?.others[i];
      if (imgOne.isCurrent) continue;
      const other = await getImgInfoByThumb(imgOne.jumpUrl);
      isFull ? loadImgFile(imgInfo.original) : imgInfo;
      res.push(other);
    }
    return res;
  };
</script>
<style scoped lang="less">
  @import '@/hentai-word/less/card-less.less';
</style>
