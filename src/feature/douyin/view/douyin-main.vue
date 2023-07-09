<template>
  <div class="video-container">
    <video
      ref="videoRef"
      src="http://bdmov.a.yximgs.com/upic/2019/11/07/19/BMjAxOTExMDcxOTI4MjZfMTI5NTM0OTk3NV8xOTI5MTYxOTMyOV8xXzM=_b_B48dbef6f420dd9d1afb40aef6780996c.mp4?tag=1-1573217409-p-0-v2rr9fcfdq-fa59e834e3a3b422"
    ></video>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  const videoRef = ref();
  onMounted(() => {
    videoRef.value.play();
  });
</script>

<style scoped lang="less">
  .video-container {
    height: 85vh;
  }
</style>
