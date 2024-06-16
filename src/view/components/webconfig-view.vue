<template>
  <div h-full w-full>
    <vue-monaco-editor
      v-model:value="code"
      theme="vs-dark"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
    />
  </div>
</template>
<script setup lang="ts">
  import { ref, shallowRef } from 'vue';

  const MONACO_EDITOR_OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
  };

  const code = ref('// some code...');
  const editorRef = shallowRef();
  const handleMount = (editor) => (editorRef.value = editor);

  // your action
  function formatCode() {
    editorRef.value?.getAction('editor.action.formatDocument').run();
  }
</script>

<style scoped lang="less"></style>
