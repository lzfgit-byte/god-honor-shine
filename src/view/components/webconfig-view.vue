<template>
  <div h-full w-full>
    <MonacoEditor v-model="codeValue"></MonacoEditor>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { watchEffect } from 'vue-demi';
  import MonacoEditor from '@/components/monacoEditor/monaco-editor.vue';
  import useGlobalState from '@/hooks/use-global-state';
  const codeValue = ref('');
  const { webKey } = useGlobalState();
  watchEffect(() => {
    console.log(webKey.value);
  });
</script>

<style scoped lang="less"></style>
