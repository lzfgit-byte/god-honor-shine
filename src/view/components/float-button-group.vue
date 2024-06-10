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
    tooltip="清除缓存"
    type="default"
    :style="{ right: '15px', top: '120px' }"
    @click="clearCache"
  >
    <template #icon>
      <ClearOutlined />
    </template>
  </a-float-button>
</template>
<script setup lang="ts">
  import { CarOutlined, ClearOutlined } from '@ant-design/icons-vue';
  defineProps({ handleDrawOpen: Function, clearCache: Function });
</script>

<style scoped lang="less"></style>
