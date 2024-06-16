<template>
  <a-drawer
    v-model:open="drawerOpen"
    placement="right"
    width="90vw"
    :header-style="{ display: 'none' }"
    :force-render="true"
  >
    <div h-full w-full>
      <MonacoEditor v-model="currentCode"></MonacoEditor>
    </div>
    <template #footer>
      <div h-full w-full flex justify-end items-center>
        <a-space>
          <a-button size="small" type="primary" @click="handleLoadCode">加载数据库代码</a-button>
          <a-button size="small" type="primary" @click="handleSaveCode">保存代码</a-button>
        </a-space>
      </div>
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { base64ToStr, strToBase64 } from '@ilzf/utils';
  import { ReloadCodeEvent, SaveCodeEvent } from '@ghs/constant';
  import MonacoEditor from '@/components/monacoEditor/monaco-editor.vue';
  import useGlobalState from '@/hooks/use-global-state';
  import { f_getWebConfigCode, f_saveWebConfigCode } from '@/utils/business';
  import bus from '@/utils/bus';
  const { currentCode } = useGlobalState();
  const drawerOpen = ref(false);
  const loadCode = async (key: string) => {
    const code = await f_getWebConfigCode(key);
    if (code) {
      currentCode.value = base64ToStr(code);
    }
  };
  const saveCode = async (key: string) => {
    await f_saveWebConfigCode(key, strToBase64(currentCode.value));
  };
  const currentKey = ref();
  const handleSaveCode = () => {};
  const handleLoadCode = () => {};
  defineExpose({
    add: async (key: string) => {
      currentCode.value = '';
      drawerOpen.value = true;
      currentKey.value = key;
    },
    edit: async (key: string) => {
      currentCode.value = '';
      currentKey.value = key;
      drawerOpen.value = true;
      await loadCode(key);
    },
  });
</script>

<style scoped lang="less"></style>
