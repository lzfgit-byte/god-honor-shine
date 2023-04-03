<template>
  <div class="container">
    <rule34-card v-for="item in videos" :key="item" :video-d="item"></rule34-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getHtmlByNet, getRule34MainPage } from '@/rule34/http/http';
  import { mainPage, videoInfo } from '@/rule34/type/rule34Type';
  import Rule34Card from '@/rule34/component/rule-34-card.vue';
  const url = 'https://rule34video.com/';
  const videos = ref<videoInfo[]>([]);
  getHtmlByNet(url)
    .then((res) => {
      return getRule34MainPage(res);
    })
    .then((res: mainPage) => {
      console.log(res);
      videos.value = res.videos as any;
    });
</script>

<style scoped lang="less"></style>
