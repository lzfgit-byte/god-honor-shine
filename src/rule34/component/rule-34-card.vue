<template>
  <div class="container">
    <div class="imgContainer">
      <div class="quality">{{ videoD.quality }}</div>
      <div class="time">{{ videoD.time }}</div>
      <img width="320" height="180" :src="videoD?.src" alt="" />
    </div>
    <div class="titleContainer">{{ videoD.title }}</div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref } from 'vue';
  import { videoInfo } from '@/rule34/type/rule34Type';

  const props = defineProps({ videoD: Object as PropType<videoInfo> });
</script>

<style scoped lang="less">
  .container {
    display: inline-block;
    position: relative;
    background: #212b31;
    width: 25%;
    padding: 0 17px 15px;
    box-sizing: border-box;
    cursor: pointer;
    .imgContainer {
      border-radius: 10px;
      overflow: hidden;
      .quality {
        position: absolute;
        z-index: 9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        background-color: rgba(41, 47, 52, 0.8);
        padding: 4px;
        right: 10%;
        top: 3%;
      }
      .time {
        position: absolute;
        z-index: 9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 5px;
        background-color: rgba(41, 47, 52, 0.8);
        padding: 4px;
        bottom: 38%;
        left: 10%;
      }
      img {
        display: block;
        aspect-ratio: auto 320 / 180;
        overflow-clip-margin: content-box;
        overflow: clip;
        width: 100%;
        height: 100%;
        opacity: 1 !important;
        padding: 0;
      }
    }
    .titleContainer {
      color: #fff;
      font-size: 14px;
      line-height: 1.2;
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.3s;
      text-transform: capitalize;
    }
  }
</style>
