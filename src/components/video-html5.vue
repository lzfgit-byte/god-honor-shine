<template>
  <div>
    <vue3-video-play
      v-bind="options"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
    ></vue3-video-play>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, reactive } from 'vue';
  import 'vue3-video-play/dist/style.css'; // 引入css
  import Vue3VideoPlay from 'vue3-video-play';
  const props = defineProps({
    src: String,
    title: String,
  });
  const options = reactive({
    width: 'auto', //播放器高度
    height: '550px', //播放器高度
    color: '#409eff', //主题色
    title: props.title, //视频名称
    src: props.src, //视频源
    muted: false, //静音
    webFullScreen: false,
    speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
    autoPlay: false, //自动播放
    loop: true, //循环播放
    mirror: false, //镜像画面
    ligthOff: false, //关灯模式
    volume: 1, //默认音量大小
    control: true, //是否显示控制
    controlBtns: [
      'audioTrack',
      'quality',
      'speedRate',
      'volume',
      'setting',
      'pip',
      'pageFullScreen',
      'fullScreen',
    ], //显示所有按钮,
  });
</script>

<style scoped lang="less"></style>
