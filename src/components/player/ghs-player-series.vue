<template>
  <a-float-button
    v-if="analysisRef?.length > 0"
    tooltip="查看剧集"
    type="default"
    :style="{
      right: '15px',
      top: '200px',
      width: '30px',
      height: '30px',
      opacity: 0.2,
    }"
    @click="drawerOpenModel = true"
  >
    <template #icon>
      <UnorderedListOutlined :style="{ fontSize: '14px', color: '#323' }" />
    </template>
  </a-float-button>
  <a-drawer
    v-model:open="drawerOpenModel"
    title=""
    placement="right"
    :closable="false"
    :mask-closable="true"
    z-index="20000"
    root-class-name="ghs-video-drawer-container"
    :content-wrapper-style="{ zIndex: 20000 }"
    :body-style="{ zIndex: 20000, padding: '10px' }"
    width="55%"
    :get-container="getDrawerContainer"
    :style="{ position: 'absolute' }"
  >
    <div h-full w-full overflow-auto>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane v-for="item in analysis" :key="item.url" :tab="item.title" />
      </a-tabs>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
  import { UnorderedListOutlined } from '@ant-design/icons-vue';
  import type { PropType } from 'vue-demi';
  import { watchEffect } from 'vue-demi';
  import type { Analysis } from '@ghs/types';
  import { useVModel } from '@vueuse/core';
  import { ref } from 'vue';

  const props = defineProps({ analysis: Array as PropType<Analysis[]> });
  const emits = defineEmits(['update:analysis']);
  const drawerOpenModel = ref(false);
  const analysisRef = useVModel(props, 'analysis', emits);
  const activeKey = ref('1');
  watchEffect(() => {
    if (analysisRef.value?.length > 0) {
      activeKey.value = analysisRef.value[0].url;
    }
  });

  const getDrawerContainer = () => document.getElementById('body');
</script>

<style scoped lang="less"></style>
