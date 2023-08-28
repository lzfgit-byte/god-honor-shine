<template>
  <el-dialog v-model="logDialog.visible" title="日志" width="80%">
    <div ref="logContainer" class="log-container">
      <span v-for="(item, index) in logDialog.log" :key="index">{{ item }}</span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="logDialog.autoGet()">
          {{ !logDialog.isAuto ? '自动刷新' : '停止刷新' }}
        </el-button>
        <el-button type="primary" @click="logDialog.clear()"> 清理日志 </el-button>
        <el-button type="primary" @click="logDialog.close()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { nextTick, reactive, ref } from 'vue';
  import { logger } from '../../../electron/utils';
  import { clearLogs, getLogs } from '@/utils/functions';
  const logContainer = ref<HTMLDivElement>();
  const logDialog = reactive({
    visible: false,
    log: [],
    isAuto: false,
    autoTimer: 0,
    getLog: () => {
      getLogs().then((res: string) => {
        logDialog.log = res?.split('\r') as any;
        nextTick().then(() => {
          (logContainer.value as any).scrollTop = logContainer?.value?.scrollHeight || 0;
        });
      });
    },
    show: () => {
      logDialog.visible = true;
      logDialog.getLog();
    },
    close: () => {
      logDialog.visible = false;
    },
    autoGet: () => {
      if (logDialog.isAuto) {
        logDialog.disableAuto();
        return;
      }
      logDialog.isAuto = true;
      logDialog.autoTimer = setInterval(() => {
        logDialog.getLog();
      }, 1000) as any;
    },
    disableAuto: () => {
      logDialog.isAuto = false;
      clearInterval(logDialog.autoTimer);
    },
    clear: () => {
      clearLogs().then(() => {
        logDialog.getLog();
      });
    },
  });
  defineExpose({
    execute: () => {
      logDialog.show();
    },
  });
</script>

<style scoped lang="less">
  .log-container {
    max-height: 75vh;
    overflow: auto;
    span {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #ccc;
    }
  }
</style>
