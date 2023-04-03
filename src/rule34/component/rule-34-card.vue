<template>
  <div class="container">
    <div class="imgContainer">
      <img :src="videoD?.src" />
    </div>
    <div class="titleContainer">{{
      videoD.title + '[' + videoD.time + '][' + videoD.quality + ']'
    }}</div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref } from 'vue';
  import { videoInfo } from '@/rule34/type/rule34Type';

  const props = defineProps({ videoD: Object as PropType<videoInfo> });
</script>

<style scoped lang="less"></style>
