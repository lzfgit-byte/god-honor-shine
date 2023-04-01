<template>
  <div>
    {{ resSet }}
  </div>
</template>

<script setup lang="ts">
  import { exportFunc } from '@/utils/ipc';
  import { reactive, ref } from 'vue';

  const { getAllSetting }: { getAllSetting: () => Promise<any> } = exportFunc;
  const canSetEmu = ['proxy', 'needProxy'];

  const resSet = reactive([]);

  getAllSetting().then((res) => {});
</script>

<style scoped lang="less"></style>
