<template>
  <h1>hello word</h1>
  <HelloWorld msg="Hello Word"></HelloWorld>
</template>
<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue';

  console.log('[App.vue]', `Hello world from Electron ${process.versions.electron}!`);
</script>

<style lang="less"></style>
