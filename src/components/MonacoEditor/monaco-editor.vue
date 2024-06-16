<template>
  <div ref="el" class="go-editor-area" :style="{ width, height }"></div>
  <EditorWorker></EditorWorker>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { onMounted, watch } from 'vue';
  import type * as monaco from 'monaco-editor';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import { useMonacoEditor } from './hooks/use-monaco-editor';

  const props = defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '90vh',
    },
    language: {
      type: String as PropType<string>,
      default: 'typescript',
    },
    preComment: {
      type: String as PropType<string>,
      default: '',
    },
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
    editorOptions: {
      type: Object as PropType<monaco.editor.IStandaloneEditorConstructionOptions>,
      default: () => ({}),
    },
  });
  const emits = defineEmits(['blur', 'update:modelValue']);
  self.MonacoEnvironment = {
    getWorker(workerId, label) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      if (label === 'html') {
        return new htmlWorker();
      }
      return new editorWorker();
    },
  };
  const { el, updateVal, getEditor, createEditor } = useMonacoEditor(props.language);

  const updateMonacoVal = (_val?: string) => {
    const { modelValue, preComment } = props;
    const val = preComment ? `${preComment}\n${_val || modelValue}` : _val || modelValue;
    updateVal(val);
  };

  onMounted(() => {
    const monacoEditor = createEditor(props.editorOptions);
    monacoEditor!.onDidChangeModelContent(() => {
      emits('update:modelValue', monacoEditor!.getValue());
    });
    monacoEditor!.onDidBlurEditorText(() => {
      emits('blur');
    });
    updateMonacoVal();
  });

  watch(
    () => props.modelValue,
    (val: string) => {
      val !== getEditor()?.getValue() && updateMonacoVal(val);
    }
  );
</script>

<style lang="less" scoped>
  .go-editor-area {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    padding: 5px;
    padding-left: 0;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);
    @include deep() {
      .margin,
      .monaco-editor,
      .inputarea.ime-input {
        background-color: rgba(0, 0, 0, 0);
      }

      .monaco-editor-background {
        background-color: rgba(0, 0, 0, 0);
        @include fetch-bg-color('filter-color-shallow');
      }
      .margin {
        @include fetch-bg-color('filter-color-shallow');
      }
    }
  }
</style>
