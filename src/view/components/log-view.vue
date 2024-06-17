<template>
  <div h-full w-full class="editor">
    <a-button size="small" @click="clearLogs">清空日志</a-button>
    <Codemirror
      v-model="code"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, shallowRef } from 'vue';
  import { Codemirror } from 'vue-codemirror';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { watchEffect } from 'vue-demi';
  import useGlobalState from '@/hooks/use-global-state';
  const { logs } = useGlobalState();
  const code = ref(``);
  const extensions = [javascript(), oneDark];

  const view = shallowRef();
  const handleReady = (payload) => {
    view.value = payload.view;
  };
  const clearLogs = () => {
    logs.value = [];
  };

  watchEffect(() => {
    code.value = logs.value.join('\n');
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
