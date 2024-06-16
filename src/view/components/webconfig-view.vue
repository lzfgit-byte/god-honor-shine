<template>
  <div h-full w-full>
    <MonacoEditor v-model="currentCode"></MonacoEditor>
  </div>
</template>
<script setup lang="ts">
  import { watchEffect } from 'vue-demi';
  import { onMounted } from 'vue';
  import { SaveCodeEvent } from '@ghs/constant';
  import MonacoEditor from '@/components/monacoEditor/monaco-editor.vue';
  import useGlobalState from '@/hooks/use-global-state';
  import bus from '@/utils/bus';
  const { webKey, currentCode } = useGlobalState();
  onMounted(() => {
    bus.off(SaveCodeEvent);
    bus.on(SaveCodeEvent, () => {});
  });
</script>

<style scoped lang="less"></style>
