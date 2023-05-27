<template>
  <h1>hello word</h1>
  <HelloWorld msg="Hello Word"></HelloWorld>
</template>
<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue';
  import useMsgTitle from '@/common/useMsgTitle';
  useMsgTitle();
</script>

<style lang="less"></style>
