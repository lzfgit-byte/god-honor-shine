<template>
  <div class="img-container">
    <div v-if="!srcRef" class="img-sketch"> 加载中 </div>
    <div v-else class="img-c-container">
      <img :src="srcRef" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { f_getImageBase64 } from '@/utils/functions';

  const props = defineProps({ src: String });
  const srcRef = ref();
  f_getImageBase64(props?.src).then((res) => {
    srcRef.value = res;
  });
</script>

<style scoped lang="less">
  .img-container {
    display: inline-flex;
    width: 100%;
    justify-content: center;
    height: 230px;
    .img-sketch {
      display: inline-flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    .img-c-container {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        object-fit: cover;
      }
    }
  }
</style>
