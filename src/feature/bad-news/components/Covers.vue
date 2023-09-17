<template>
  <div
    class="container"
    :style="{
      '--widthImage': `${widthImage}px`,
    }"
    @click="handlerClick"
  >
    <div class="img-container">
      <CoverImage :url="videoInfo?.coverUrl || ''" @width-change="handlerWidthChange"></CoverImage>
    </div>
    <div class="title" :title="videoInfo?.title">{{ videoInfo?.title }}</div>
    <div v-if="videoInfo?.videType !== ''" class="type">
      <span>
        {{ videoInfo?.videType }}
      </span>
    </div>
    <div class="time">{{ videoInfo?.time }}</div>
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
      :type="videoSet.type"
      :src="videoSet.videoSrc"
    ></VideoHtml5>
  </el-dialog>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue';
  import { reactive, ref } from 'vue';
  import CoverImage from '@/feature/bad-news/components/CoverImage.vue';
  import type { video } from '@/feature/bad-news/type/types';
  import VideoHtml5 from '@/components/video-html5.vue';
  const props = defineProps({ videoInfo: { type: Object as PropType<video> } });
  const videoSet = reactive({
    visible: false,
    videoTitle: '',
    videoSrc: '',
    type: 'video/mp4',
    playVideo: (src: string, title = '', type = 'video/mp4') => {
      videoSet.videoSrc = src;
      videoSet.videoTitle = title;
      videoSet.visible = true;
      videoSet.type = type;
    },
  });
  const handlerClick = () => {
    if (props?.videoInfo?.videType === '长视频') {
      videoSet.playVideo(props.videoInfo?.videoUrl || '', props.videoInfo?.title || '', 'm3u8');
      return;
    }
    videoSet.playVideo(props.videoInfo?.videoUrl || '', props.videoInfo?.title || '');
  };
  const widthImage = ref(0);
  const handlerWidthChange = (width: number) => {
    widthImage.value = width < 150 ? 150 : width;
  };
</script>

<style scoped lang="less">
  @import '../less/cover';
</style>
