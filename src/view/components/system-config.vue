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
        <a-button>收藏导入</a-button>
        <a-button>收藏导出</a-button>
      </a-space>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import { watchEffect } from 'vue-demi';
  import useGlobalState from '@/hooks/use-global-state';

  defineProps({ choseDbPath: Function });
  const { dbPath } = useGlobalState();

  watchEffect(() => {});
</script>

<style scoped lang="less"></style>
