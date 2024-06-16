<template>
  <div h-full w-full>
    <MonacoEditor></MonacoEditor>
  </div>
</template>
<script setup lang="ts">
  import { ref, shallowRef } from 'vue';
  import MonacoEditor from '@/components/monacoEditor/monaco-editor.vue';
</script>

<style scoped lang="less"></style>
