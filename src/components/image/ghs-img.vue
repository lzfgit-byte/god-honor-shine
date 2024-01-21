<template>
  <div h-full w-full relative flex justify-center items-center class="img-container">
    <img :src="imgSrc" alt="" />
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { f_request_img_get } from '@/utils/functions';

  const props = defineProps({ url: String });
  const imgSrc = ref();
  const init = async () => {
    imgSrc.value = await f_request_img_get(props.url);
  };
  init();
</script>

<style scoped lang="less">
  .img-container {
    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      width: auto;
    }
  }
</style>
