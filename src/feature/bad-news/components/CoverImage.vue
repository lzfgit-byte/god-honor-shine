<template>
  <img
    ref="imgRef"
    :width="imageWidth"
    :height="imageHeight"
    :src="url"
    alt=""
    @load="handlerLoad"
  />
</template>
<script setup lang="ts">
  import useCoverImage from '@/feature/bad-news/hooks/useCoverImage';

  defineProps({ url: String });
  const { handlerLoad, imgRef, imageHeight, imageWidth } = useCoverImage();
</script>

<style scoped lang="less"></style>
