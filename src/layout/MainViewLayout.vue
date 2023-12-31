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
  .container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
