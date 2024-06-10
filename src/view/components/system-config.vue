<template>
  <div h-full w-full>
    <a-row>
      <a-col>
        <a-button size="small" type="default" @click="choseDbPath">选择dbPath</a-button>
      </a-col>
      <a-col :span="20" :offset="1">
        <a-form-item label="dbPath">
          {{ dbpath }}
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { BaseConfig } from '@ghs/types';

  defineProps({ webConfig: Object as PropType<BaseConfig>, dbpath: String, choseDbPath: Function });
</script>

<style scoped lang="less"></style>
