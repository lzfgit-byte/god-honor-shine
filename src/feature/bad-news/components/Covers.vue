<template>
  <div class="container" @click="handlerClick">
    <div class="img-container">
      <!--      <CoverImage :url="videoInfo?.coverUrl || ''"></CoverImage> -->
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
      :src="videoSet.videoSrc"
    ></VideoHtml5>
  </el-dialog>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue';
  import { reactive } from 'vue';
  import CoverImage from '@/feature/bad-news/components/CoverImage.vue';
  import type { video } from '@/feature/bad-news/type/types';
  import VideoHtml5 from '@/components/video-html5.vue';
  const props = defineProps({ videoInfo: { type: Object as PropType<video> } });
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
  const handlerClick = () => {
    videoSet.playVideo(props.videoInfo?.videoUrl || '', props.videoInfo?.title || '');
  };
</script>

<style scoped lang="less">
  @import '../less/cover';
</style>
