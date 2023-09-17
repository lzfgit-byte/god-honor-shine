<template>
  <div class="image-container">
    <img
      ref="imgRef"
      :width="imageWidth"
      :height="imageHeight"
      :src="url"
      alt=""
      @load="handlerLoad"
    />
  </div>
</template>
<script setup lang="ts">
  import useCoverImage from '@/feature/bad-news/hooks/useCoverImage';

  defineProps({ url: String });
  const { handlerLoad, imgRef, imageHeight, imageWidth, containerWidthComp } = useCoverImage();
</script>

<style scoped lang="less">
  .div {
    box-sizing: border-box;
  }
  .image-container {
    width: v-bind(containerWidthComp);
    height: v-bind(containerWidthComp);
  }
</style>
