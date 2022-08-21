<template>
  <h1>{{ title }}</h1>
</template>
<script setup lang="ts">
  import {ref} from "vue";

  const title = ref<string>('hello word')
</script>
<style>
  #app{
    box-sizing: border-box;
  }
</style>
