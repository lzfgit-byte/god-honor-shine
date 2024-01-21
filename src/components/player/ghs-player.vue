<template>
  <GhsDialog
    v-model:visible="visible"
    :title="titleComp"
    :destroy-on-close="true"
    top="5%"
    :mask-closed="true"
  >
    <VideoHtml5 v-if="visible" :src="srcComp" :title="titleComp" :type="typeComp"></VideoHtml5>
  </GhsDialog>
</template>
<script setup lang="ts">
  import { ref } from 'vue-demi';
  import GhsDialog from '@/components/dialog/ghs-dialog.vue';
  import VideoHtml5 from '@/components/player/video-html5.vue';
  import type { VideoType } from '@/components/player/types';
  const visible = ref(false);
  const srcComp = ref<String>();
  const titleComp = ref<String>();
  const typeComp = ref<'m3u8' | 'mp4'>();
  defineExpose({
    show: (src: string, title: string, type: VideoType) => {
      srcComp.value = src;
      titleComp.value = title;
      typeComp.value = type;
      visible.value = true;
    },
  });
</script>

<style scoped lang="less"></style>
