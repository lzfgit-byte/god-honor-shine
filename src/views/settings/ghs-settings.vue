<template>
  <GhsDialog
    v-model:visible="visible"
    title="设置"
    :destroy-on-close="true"
    top="5%"
    :mask-closed="true"
  >
    <div w-full h-80vh relative>
      <div w-full h-30px flex items-center>
        <GhsInput v-model:value="playUrl"></GhsInput>
        <div w-350px m-l-4 min-w-350px>
          <GhsButton m-r-2 @click="playMp4">播放mp4</GhsButton>
          <GhsButton m-r-2 @click="playM3u8">播放m3u8</GhsButton>
          <GhsButton m-r-2 @click="requestNetwork">网络请求MP4</GhsButton>
        </div>
      </div>
      <div w-full>
        <video :key="playUrl" :src="playUrl"></video>
      </div>
    </div>
  </GhsDialog>

  <GhsPlayer ref="ghsPlayerRef"></GhsPlayer>
</template>
<script setup lang="ts">
  import { ref } from 'vue-demi';
  import GhsDialog from '@/components/dialog/ghs-dialog.vue';
  import GhsPlayer from '@/components/player/ghs-player.vue';
  import type { GhsPlayerExpose } from '@/components/player/types';
  import GhsInput from '@/components/input/ghs-input.vue';
  import GhsButton from '@/components/button/ghs-button.vue';
  import { GHSMessage } from '@/components/message';
  import { f_request_mp4_data_get, f_request_string_get_data } from '@/utils/functions';
  const ghsPlayerRef = ref<GhsPlayerExpose>();
  const visible = ref(false);

  const playUrl = ref();
  const playMp4 = () => {
    if (playUrl.value) {
      ghsPlayerRef.value?.show(playUrl.value, 'mp4', 'mp4');
    } else {
      GHSMessage.info('空地址');
    }
  };
  const playM3u8 = () => {
    if (playUrl.value) {
      ghsPlayerRef.value?.show(playUrl.value, 'm3u8', 'm3u8');
    } else {
      GHSMessage.info('空地址');
    }
  };
  const requestNetwork = async () => {
    if (playUrl.value) {
      const res = await f_request_mp4_data_get(playUrl.value);
      if (res) {
        ghsPlayerRef.value?.show(res, 'mp4', 'mp4');
      }
    } else {
      await GHSMessage.info('空地址');
    }
  };

  defineExpose({
    show: () => {
      visible.value = true;
    },
  });
</script>

<style scoped lang="less"></style>
