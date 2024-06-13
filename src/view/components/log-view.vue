<template>
  <div h-full w-full overflow-auto>
    <div id="codemirror" class="editor"></div>
  </div>
</template>

<script setup lang="ts">
  import { EditorView, keymap } from '@codemirror/view';
  import { defaultKeymap } from '@codemirror/commands';
  import { EditorState } from '@codemirror/state';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { lineNumbers } from '@codemirror/gutter';

  import { onMounted, ref } from 'vue';
  import useGlobalState from '@/hooks/use-global-state';

  const { logs } = useGlobalState();
  const editorView = ref<EditorView | null>(null);

  const createEditor = () => {
    const state = EditorState.create({
      doc: `// 这是JavaScript代码编辑器\nconsole.log("Hello, CodeMirror 6!");`,
      extensions: [keymap.of(defaultKeymap), oneDark],
    });
    editorView.value = new EditorView({
      state,
      parent: document.getElementById('codemirror'),
    });
  };

  const updateEditorContent = (newContent: string) => {
    if (editorView.value) {
      const newState = EditorState.create({
        doc: newContent,
        extensions: [keymap.of(defaultKeymap), oneDark],
      });
      editorView.value.setState(newState);
    }
  };

  onMounted(() => {
    createEditor();
    setTimeout(() => {
      updateEditorContent('console.log("Updated content!");');
    }, 1000);
  });
</script>

<style scoped lang="less">
  .editor {
    height: 100%;
    width: 100%;
    :deep(.cm-editor) {
      outline: none !important;
      height: 100%;
    }
  }
</style>
