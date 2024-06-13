<template>
  <div h-full w-full overflow-auto>
    <div id="codemirror"></div>
  </div>
</template>

<script setup lang="ts">
  import { EditorView, keymap } from '@codemirror/view';
  import { defaultKeymap } from '@codemirror/commands';
  import { EditorState } from '@codemirror/state';
  import { oneDark } from '@codemirror/theme-one-dark';

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

  // Example of dynamic update:
  // Call updateEditorContent with new code to update the editor content
  // updateEditorContent('console.log("Updated content!");');
</script>

<style scoped lang="less"></style>
