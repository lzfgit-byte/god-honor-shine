<template>
  <div class="container">
    <div class="imgContainer" :title="videoD?.added" @click="handlerClick">
      <div class="quality">{{ videoD?.quality }}</div>
      <div class="time">{{ videoD?.time }}</div>
      <img width="320" height="180" :src="videoD?.src" alt="" />
    </div>
    <div class="titleContainer" :title="videoD?.title">
      {{ `[${videoD?.views}]${videoD?.title}` }}
    </div>
  </div>
  <el-dialog
    v-model="videoSet.visible"
    width="1050px"
    :title="videoSet.videoTitle"
    @close="videoSet.handlerCancel"
  >
    <VideoHtml5
      v-if="videoSet.visible"
      :title="videoSet.videoTitle"
      :src="videoSet.videoSrc"
    ></VideoHtml5>
  </el-dialog>
  <el-dialog v-model="videoChose.visible" width="500px" title="选择清晰度">
    <div>
      <el-space>
        <el-button
          v-for="item in videos"
          :key="item"
          :title="item.videoUrl"
          @click="handlerClickChose(item)"
        >
          {{ item.postFix }}
        </el-button>
      </el-space>
    </div>
  </el-dialog>
  <img :src="`http://127.0.0.1:3356/closed?url=${videoSet.videoUrl2}`" style="display: none" />
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { reactive, ref } from 'vue';
  import type { videoData, videoInfo } from '@/feature/rule34/type/rule34Type';
  import VideoHtml5 from '@/components/video-html5.vue';
  import { getHtml, loadUrl } from '@/utils/functions';
  import { rule34_getRule34Video } from '@/feature/rule34/utils/functions';
  import { getVideoUrl } from '@/utils/kit-utils';

  const props = defineProps({ videoD: Object as PropType<videoInfo> });
  const videoSet = reactive({
    visible: false,
    videoTitle: '',
    videoSrc: '',
    videoUrl: '',
    videoUrl2: '',
    handlerCancel: () => {
      videoSet.videoUrl2 = videoSet.videoUrl;
      videoSet.visible = false;
    },
    playVideo: (src: string, title = '') => {
      videoSet.videoSrc = src;
      videoSet.videoTitle = title;
      videoSet.visible = true;
    },
  });
  const videoChose = reactive({
    visible: false,
    videoTitle: '',
    videoSrc: '',
    show: () => {
      videoChose.visible = true;
    },
  });
  const videos = ref<videoData[]>([]);
  const handlerClick = () => {
    if (props?.videoD?.jumpUrl) {
      loadUrl(props?.videoD?.jumpUrl);
      // getHtml(props?.videoD?.jumpUrl as any).then((res) => {
      // rule34_getRule34Video(res).then((src: videoData[]) => {
      //   videos.value = src;
      //   videoChose.show();
      // });
      // });
    }
  };
  const handlerClickChose = (item: videoData) => {
    videoChose.visible = false;
    videoSet.videoUrl = item.videoUrl as any;
    videoSet.playVideo(
      getVideoUrl(item.videoUrl as string),
      `${props?.videoD?.title}[${item.postFix}]`
    );
  };
</script>

<style scoped lang="less">
  .container {
    display: inline-block;
    position: relative;

    width: 25%;
    padding: 0 17px 15px;
    box-sizing: border-box;
    cursor: pointer;
    .imgContainer {
      border-radius: 10px;
      overflow: hidden;
      .quality {
        position: absolute;
        z-index: 9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        background-color: rgba(41, 47, 52, 0.8);
        padding: 4px;
        right: 10%;
        top: 3%;
      }
      .time {
        position: absolute;
        z-index: 9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        background-color: rgba(41, 47, 52, 0.8);
        padding: 4px;
        right: 23%;
        top: 3%;
      }
      img {
        display: block;
        aspect-ratio: auto 320 / 180;
        overflow-clip-margin: content-box;
        overflow: clip;
        width: 100%;
        height: 100%;
        opacity: 1 !important;
        padding: 0;
      }
    }
    .titleContainer {
      color: #fff;
      font-size: 14px;
      line-height: 1.2;
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.3s;
      text-transform: capitalize;
    }
  }
</style>
