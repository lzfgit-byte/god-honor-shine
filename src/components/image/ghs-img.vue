<template>
  <div h-full w-full relative flex justify-center items-center class="img-container">
    <img :src="imgSrc" alt="" @error="handleError" />
  </div>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import src from './loading.gif?url';
  import { f_request_img_get, f_win_img_get } from '@/utils/functions';

  const props = defineProps({ url: String, force: Boolean, maxHeight: String, maxWidth: String });
  const imgSrc = ref(src);
  const handleError = () => {
    imgSrc.value = src;
  };
  const init = async () => {
    if (!props.url) {
      return;
    }
    if (props.force) {
      imgSrc.value = await f_win_img_get(props.url);
    } else {
      imgSrc.value = await f_request_img_get(props.url);
    }
    if (imgSrc.value === 'data:image/png;base64,') {
      imgSrc.value = src;
    }
  };
  init();
  const imgMaxHeight = computed(() => props.maxHeight || '100%');
  const imgMaxWidth = computed(() => props.maxWidth || '100%');
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .img-container {
    img {
      max-width: v-bind(imgMaxWidth);
      max-height: v-bind(imgMaxHeight);
      height: auto;
      width: auto;
      border-radius: @radius;
    }
  }
</style>
