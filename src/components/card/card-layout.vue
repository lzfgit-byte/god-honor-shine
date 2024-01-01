<template>
  <div class="container">
    <CardItem></CardItem>
  </div>
</template>
<script setup lang="ts">
  import CardItem from '@/components/card/card-item.vue';
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .container {
    padding: 10px 10px 5px 10px;
    border-radius: 10px;
    border: 1px solid @global-border-color;
    width: 230px;
  }
</style>
