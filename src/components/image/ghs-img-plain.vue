<template>
  <img :src="imgSrc" :alt="imgSrc" />
  <span
    v-if="percentageRef > 0 && percentageRef < 100"
    absolute
    color-white
    style="left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); font-size: 16px"
  >
    {{ progressInfo }}
  </span>
</template>
<script setup lang="ts">
  import useImg from '@/components/image/hooks/useImg';
  const props = defineProps({ url: String, force: Boolean, global: Boolean });
  const { init, imgSrc, progressInfo, percentageRef } = useImg(props);
  init();
</script>

<style scoped lang="less">
  @import '@/styles/values';
  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    border-radius: @radius;
    cursor: grab;
    &:active {
      cursor: grabbing !important;
    }
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
