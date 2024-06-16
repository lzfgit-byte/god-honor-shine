<template>
  <div h-full w-full>
    <MonacoEditor v-model="currentCode"></MonacoEditor>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { SaveCodeEvent } from '@ghs/constant';
  import { strToBase64 } from '@ilzf/utils';
  import { watchEffect } from 'vue-demi';
  import MonacoEditor from '@/components/monacoEditor/monaco-editor.vue';
  import useGlobalState from '@/hooks/use-global-state';
  import bus from '@/utils/bus';
  import { f_getCurrentWebConfig, f_saveWebConfigCode } from '@/utils/business';
  const { webKey, currentCode } = useGlobalState();
  watchEffect(async () => {
    if (webKey.value) {
      currentCode.value = await f_getCurrentWebConfig(webKey.value);
    }
  });
  onMounted(() => {
    bus.off(SaveCodeEvent);
    bus.on(SaveCodeEvent, async () => {
      await f_saveWebConfigCode(webKey.value, strToBase64(currentCode.value));
    });
  });
</script>

<style scoped lang="less"></style>
