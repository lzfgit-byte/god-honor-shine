<template>
  <div h-full w-full relative flex justify-center items-center class="img-container">
    <img :src="imgSrc" alt="" />
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import src from './loading.gif?url';
  import { f_request_img_get, f_win_img_get } from '@/utils/functions';

  const props = defineProps({ url: String, force: Boolean });
  const imgSrc = ref(src);
  const init = async () => {
    if (!props.url) {
      return;
    }
    if (props.force) {
      imgSrc.value = await f_win_img_get(props.url);
    }
    imgSrc.value = await f_request_img_get(props.url);
  };
  init();
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .img-container {
    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      width: auto;
      border-radius: @radius;
    }
  }
</style>
