<template>
  <a-float-button
    tooltip="打开侧边栏"
    type="default"
    :style="{ right: '15px', top: '60px' }"
    @click="handleDrawOpen"
  >
    <template #icon>
      <CarOutlined />
    </template>
  </a-float-button>
  <a-float-button
    :tooltip="`清除缓存,缓存大小:${cacheSize || 0}`"
    type="default"
    :style="{ right: '15px', top: '120px' }"
    @click="clearCache(null)"
    @mouseenter="mouseEnter"
  >
    <template #icon>
      <ClearOutlined />
    </template>
  </a-float-button>
  <a-float-button
    :tooltip="`清除HTML缓存,缓存大小:${cacheSize || 0}`"
    type="default"
    :style="{ right: '15px', top: '180px' }"
    @click="clearCache(FileType.HTML)"
    @mouseenter="mouseEnter"
  >
    <template #icon>
      <Html5Outlined />
    </template>
  </a-float-button>
  <a-float-button
    :tooltip="`${dbPath || ''}`"
    type="default"
    :style="{ right: '15px', top: '240px' }"
    @click="choseDbPath"
  >
    <template #icon>
      <FileTextOutlined />
    </template>
  </a-float-button>
</template>
<script setup lang="ts">
  import {
    CarOutlined,
    ClearOutlined,
    FileTextOutlined,
    Html5Outlined,
  } from '@ant-design/icons-vue';
  import { FileType } from '@ghs/types';
  defineProps({
    handleDrawOpen: Function,
    clearCache: Function,
    dbPath: String,
    cacheSize: String,
    choseDbPath: Function,
    mouseEnter: Function,
  });
</script>

<style scoped lang="less"></style>
