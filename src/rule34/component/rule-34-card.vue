<template>
  <div class="container">
    <div class="imgContainer" @click="handlerClick">
      <div class="quality">{{ videoD.quality }}</div>
      <div class="time">{{ videoD.time }}</div>
      <img width="320" height="180" :src="videoD?.src" alt="" />
    </div>
    <div class="titleContainer" :title="videoD?.title">{{ videoD.title }}</div>
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
  <a-modal
    :visible="videoChose.visible"
    width="500px"
    style="top: 5px"
    title="选择清晰度"
    @cancel="videoChose.visible = false"
    @ok="videoChose.visible = false"
  >
    <a-space>
      <a-button
        v-for="item in videos"
        :key="item"
        :title="item.videoUrl"
        @click="handlerClickChose(item)"
      >
        {{ item.postFix }}
      </a-button>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
  import { PropType, reactive, ref } from 'vue';
  import { Modal as AModal, Button as AButton, Space as ASpace } from 'ant-design-vue';
  import { videoData, videoInfo } from '@/rule34/type/rule34Type';
  import { getHtmlByNet, getRule34Video } from '@/rule34/http/http';
  import VideoHtml5 from '@/components/video-html5.vue';

  const props = defineProps({ videoD: Object as PropType<videoInfo> });
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
      getHtmlByNet(props?.videoD?.jumpUrl).then((res) => {
        getRule34Video(res).then((src: videoData[]) => {
          videos.value = src;
          videoChose.show();
          // videoSet.playVideo('http://127.0.0.1:3333/getByte?url=' + src, props?.videoD?.title);
        });
      });
    }
  };
  const handlerClickChose = (item: videoData) => {
    videoChose.visible = false;
    debugger;
    videoSet.playVideo(
      'http://127.0.0.1:3333/getByte?url=' + item.videoUrl,
      props?.videoD?.title + `[${item.postFix}]`
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
