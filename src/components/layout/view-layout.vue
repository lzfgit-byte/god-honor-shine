<template>
  <div class="view-container" h-full w-full relative>
    <div class="view-action" w-full flex h-full items-center justify-end gap-1>
      <slot name="action"></slot>
    </div>
    <div class="view-body" w-full relative>
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="less">
  @import './styles/view-layout';
</style>
