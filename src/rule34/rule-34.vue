<template>
  <div class="container">
    <h1></h1>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getHtmlByNet, getRule34MainPage } from '@/rule34/http/http';
  import { mainPage } from '@/rule34/type/rule34Type';
  const url = 'https://rule34video.com/';
  getHtmlByNet(url)
    .then((res) => {
      return getRule34MainPage(res);
    })
    .then((res: mainPage) => {
      console.log(res);
    });
</script>

<style scoped lang="less"></style>
