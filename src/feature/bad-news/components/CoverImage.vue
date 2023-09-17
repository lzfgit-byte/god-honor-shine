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
  import { watchEffect } from 'vue';
  import useCoverImage from '@/feature/bad-news/hooks/useCoverImage';

  defineProps({ url: String });
  const emits = defineEmits(['widthChange']);
  const { handlerLoad, imgRef, imageHeight, imageWidth } = useCoverImage();
  watchEffect(() => {
    emits('widthChange', imageWidth.value);
  });
</script>

<style scoped lang="less"></style>
