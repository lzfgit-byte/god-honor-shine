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
      <a-col>
        <a-space>
          <a-button @click="handleImport">收藏导入</a-button>
          <a-button @click="handleExport">收藏导出</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-textarea v-model:value="videoUrl" auto-size></a-textarea>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-space>
          <a-button @click="playM3u8">播放m3u8</a-button>
          <a-button @click="playMp4">播放mp4</a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { isFalsity } from '@ilzf/utils';
  import { message } from 'ant-design-vue';
  import useGlobalState from '@/hooks/use-global-state';
  import { f_importFavorite } from '@/utils/business';
  import { imgViewerRef, videoGlobalRef } from '@/hooks/use-global-ref';

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
  // 视频
  const videoUrl = ref('');
  const playM3u8 = () => {
    if (isFalsity(videoUrl.value)) {
      message.warn('地址为空');
      return;
    }
    videoGlobalRef.value.show(videoUrl.value, '测试', 'm3u8');
  };
  const playMp4 = () => {};
</script>

<style scoped lang="less"></style>
