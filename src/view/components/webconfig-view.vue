<template>
  <div h-full w-full>
    <MonacoEditor v-model="currentCode"></MonacoEditor>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { ReloadCodeEvent, SaveCodeEvent } from '@ghs/constant';
  import { base64ToStr, strToBase64 } from '@ilzf/utils';
  import { watchEffect } from 'vue-demi';
  import MonacoEditor from '@/components/monacoEditor/monaco-editor.vue';
  import useGlobalState from '@/hooks/use-global-state';
  import bus from '@/utils/bus';
  import { f_getWebConfigCode, f_saveWebConfigCode } from '@/utils/business';
  const { webKey, currentCode } = useGlobalState();
  const loadCode = async () => {
    const code = await f_getWebConfigCode(webKey.value);
    if (code) {
      currentCode.value = base64ToStr(code);
    }
  };
  watchEffect(async () => {
    if (webKey.value) {
      await loadCode();
    }
  });
  onMounted(() => {
    bus.off(SaveCodeEvent);
    bus.on(SaveCodeEvent, async () => {
      await f_saveWebConfigCode(webKey.value, strToBase64(currentCode.value));
    });
    bus.off(ReloadCodeEvent);
    bus.on(ReloadCodeEvent, async () => {
      await loadCode();
    });
  });
</script>

<style scoped lang="less"></style>
