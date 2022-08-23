<template>
  <div style="margin: 20px">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="loli">
        <lolicon v-if="activeKey === '1'"></lolicon>
      </a-tab-pane>
      <a-tab-pane key="2" tab="nyan" force-render
        ><nyan-sexy v-if="activeKey === '2'"></nyan-sexy
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import Lolicon from '@/sexy-photo/compoent/lolicon-sexy.vue';
  import NyanSexy from '@/sexy-photo/compoent/nyan-sexy.vue';
  import { ref } from 'vue';
  import { Tabs as ATabs, TabPane as ATabPane, Button as AButton } from 'ant-design-vue';
  const activeKey = ref('1');
  const reset = () => {};
</script>

<style scoped lang="less"></style>
