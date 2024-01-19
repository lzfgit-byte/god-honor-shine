<template>
  <div>
    <div id="mui-player" style="width: 100%; height: 80vh"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, reactive } from 'vue';
  import 'mui-player/dist/mui-player.min.css';
  // @ts-ignore
  import MuiPlayer from 'mui-player';
  import Hls from 'hls.js';
  // @ts-ignore
  import MuiPlayerDesktopPlugin from 'mui-player-desktop-plugin';
  // @ts-ignore
  // import Vue3VideoPlay from 'vue3-video-play';

  const props = defineProps({
    src: String,
    title: String,
    type: String,
  });
  let mp;
  let parse = {};
  if (props.type === 'm3u8') {
    parse = {
      type: 'hls',
      loader: Hls,
      config: {
        // hls config to：https://github.com/video-dev/hls.js/blob/HEAD/docs/API.md#fine-tuning
        debug: false,
      },
    };
  }
  onMounted(() => {
    mp = new MuiPlayer({
      container: '#mui-player',
      poster: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg',
      title: props.title,
      autoFit: false,
      height: '80vh',
      objectFit: 'contain',
      src: props.src,
      custom: { footerControls: [] },
      plugins: [new MuiPlayerDesktopPlugin({})],
      parse,
    });
  });
  onUnmounted(() => {
    mp.destroy();
  });
  // const options = reactive({
  //   width: 'auto', // 播放器高度
  //   height: '550px', // 播放器高度
  //   color: '#409eff', // 主题色
  //   title: props.title, // 视频名称
  //   src: props.src, // 视频源
  //   muted: false, // 静音
  //   webFullScreen: false,
  //   speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], // 播放倍速
  //   autoPlay: false, // 自动播放
  //   loop: true, // 循环播放
  //   mirror: false, // 镜像画面
  //   ligthOff: false, // 关灯模式
  //   volume: 1, // 默认音量大小
  //   control: true, // 是否显示控制
  //   type: props.type, // 视频类型
  //   controlBtns: [
  //     'audioTrack',
  //     'quality',
  //     'speedRate',
  //     'volume',
  //     'setting',
  //     'pip',
  //     'pageFullScreen',
  //     'fullScreen',
  //   ], // 显示所有按钮,
  // });
  // onUnmounted(() => {});
</script>

<style scoped lang="less"></style>
