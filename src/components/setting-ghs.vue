<template>
  <el-dropdown trigger="click">
    <el-icon :size="30"><Setting /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handlerLog"> 查看日志 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <CustomLog ref="logExecute"></CustomLog>
</template>
<script setup lang="ts">
  import { Setting } from '@element-plus/icons-vue';
  import { ref } from 'vue';
  import CustomLog from '@/components/settings/custom-log.vue';

  const logExecute = ref<{ execute: () => void }>();
  const handlerLog = () => {
    logExecute.value?.execute();
  };
</script>

<style scoped lang="less"></style>
