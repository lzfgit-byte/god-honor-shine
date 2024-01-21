<template>
  <div class="view-container" h-full w-full>
    <div class="view-tag" w-full>
      <slot name="tag"></slot>
    </div>
    <div class="view-body" w-full>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="less">
  @height: 20%;
  .view-tag {
    height: 20%;
  }
  .view-body {
    height: calc(100% - @height);
  }
</style>
