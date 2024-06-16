<template>
  <div h-full w-full>
    <MonacoEditor v-model="currentCode"></MonacoEditor>
  </div>
</template>
<script setup lang="ts">
  import { watchEffect } from 'vue-demi';
  import MonacoEditor from '@/components/monacoEditor/monaco-editor.vue';
  import useGlobalState from '@/hooks/use-global-state';
  const { webKey, currentCode } = useGlobalState();
  watchEffect(() => {
    console.log(webKey.value);
  });
</script>

<style scoped lang="less"></style>
