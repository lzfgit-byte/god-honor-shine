<template>
  <div class="container" :class="{ showMargin: !isShowMargin }">
    <div class="icon">
      <NIcon>
        <component :is="icon"></component>
      </NIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { NIcon } from 'naive-ui';
  defineProps({ icon: Object, title: String, type: String, isShowMargin: Boolean });
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    color: white;
    border: 1px solid @global-border-color;
    border-radius: 50%;
    cursor: pointer;
    background-color: @global-secondary;
    &:hover {
      background-color: @dock-item-hove-color;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .showMargin {
    margin-top: 15px;
  }
</style>
