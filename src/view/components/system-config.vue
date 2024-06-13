<template>
  <div h-full w-full>
    <a-row>
      <a-col>
        <a-button size="small" type="default" @click="choseDbPath">选择dbPath</a-button>
      </a-col>
      <a-col :span="20" :offset="1">
        <a-form-item label="dbPath">
          {{ dbPath }}
        </a-form-item>
      </a-col>
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
