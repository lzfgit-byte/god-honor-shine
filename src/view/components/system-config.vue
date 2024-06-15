<template>
  <div h-full w-full>
    <a-row>
      <a-col>
        <a-button @click="choseDbPath">选择dbPath</a-button>
      </a-col>
      <a-col :span="16" :offset="1">
        <a-form-item label="dbPath">
          {{ dbPath }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-space>
        <a-button @click="handleImport">收藏导入</a-button>
        <a-button @click="handleExport">收藏导出</a-button>
      </a-space>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import useGlobalState from '@/hooks/use-global-state';
  import { f_importFavorite } from '@/utils/business';

  defineProps({ choseDbPath: Function });
  const { dbPath } = useGlobalState();
  const handleImport = () => {
    const fileInput: HTMLInputElement = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.ghs';
    fileInput.addEventListener('change', function () {
      let selectedFile = fileInput.files[0];
      const path = selectedFile.path;
      f_importFavorite(path);
    });
    fileInput.click();
  };
  const handleExport = () => {};
</script>

<style scoped lang="less"></style>
