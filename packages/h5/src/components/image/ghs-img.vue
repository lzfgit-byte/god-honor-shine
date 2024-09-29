<template>
  <img :src="imgSrc" :alt="imgSrc" />
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import useImg from '@/components/image/useImg';

  const props = defineProps({
    url: String,
    force: Boolean,
    maxHeight: String,
    maxWidth: String,
    global: Boolean,
  });
  const { init, imgSrc, handleError, percentageRef, progressInfo, isError } = useImg(props);
  init();
  const imgMaxHeight = computed(() => props.maxHeight || '100%');
  const imgMaxWidth = computed(() => props.maxWidth || '100%');
</script>

<style scoped lang="less"></style>
