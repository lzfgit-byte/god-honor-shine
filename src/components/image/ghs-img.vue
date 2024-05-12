<template>
  <div h-full w-full relative flex justify-center items-center class="img-container">
    <img :src="imgSrc" alt="" @error="handleError" />
    <div absolute bottom-1 w-full color="white" class="progress-img">
      <div relative w-full box-border p-l-2 p-r-2 class="progress">
        <GhsProgress v-model:percentage="percentageRef"></GhsProgress>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import useImg from '@/components/image/hooks/useImg';
  import GhsProgress from '@/components/progress/ghs-progress.vue';

  const props = defineProps({ url: String, force: Boolean, maxHeight: String, maxWidth: String });
  const { init, imgSrc, handleError, percentageRef } = useImg(props);
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
    .progress-img {
      background-color: rgba(0, 0, 0, 0.44);
      border-bottom-right-radius: @radius;
      border-bottom-left-radius: @radius;
    }
  }
</style>
