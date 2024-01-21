<template>
  <div>
    <div id="mui-player" style="width: 100%; height: 80vh"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import 'mui-player/dist/mui-player.min.css';
  // @ts-ignore
  import MuiPlayer from 'mui-player';
  import Hls from 'hls.js';
  // @ts-ignore
  import MuiPlayerDesktopPlugin from 'mui-player-desktop-plugin';
  import type { PropType } from 'vue-demi';
  import type { VideoType } from '@/components/player/types';

  const props = defineProps({
    src: String,
    title: String,
    type: String as PropType<VideoType>,
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
</script>

<style scoped lang="less"></style>
