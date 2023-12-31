<template>
  <NConfigProvider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <div class="container">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="dock">
        <slot name="dock"></slot>
      </div>
      <div class="setting">
        <slot name="setting"></slot>
      </div>
    </div>
  </NConfigProvider>
</template>
<script setup lang="ts">
  import { NConfigProvider, createTheme, dateZhCN, inputDark, zhCN } from 'naive-ui';
  const darkTheme = createTheme([inputDark]);
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    .header {
      height: @header-height;
      width: 100%;
      border-bottom: solid 1px @global-border-color;
    }
    .body {
      width: 100%;
      height: calc(100% - @header-height);
    }
    .dock {
      position: absolute;
      height: @dock-height;
      border: 1px solid @global-border-color;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 25px;
      padding: 0 25px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .setting {
      position: absolute;
      width: @setting-height;
      border: 1px solid @global-border-color;
      bottom: 70px;
      right: 20px;
      border-radius: 25px;
      padding: 25px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
