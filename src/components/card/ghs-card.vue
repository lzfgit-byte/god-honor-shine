<template>
  <div class="ghs-card-container" h-full w-full relative flex flex-col justify-center items-center>
    <div class="ghs-card-header" w-full flex justify-around>
      <div class="ghs-card-header-title" flex justify-start items-center>
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="ghs-card-header-extra" flex justify-start items-center>
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="ghs-card-body" flex w-full relative>
      <slot></slot>
    </div>
    <div class="ghs-card-footer" flex items-center w-full>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  defineProps({ title: String });
</script>

<style scoped lang="less">
  @titleWidth: 50%;
  .ghs-card-container {
    .ghs-card-header-title {
      width: @titleWidth;
    }
    .ghs-card-header-extra {
      width: calc(100% - @titleWidth);
    }
  }
</style>
