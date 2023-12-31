<template>
  <el-dialog v-model="dialog.visible" title="设置" width="80%">
    <div class="set-container">
      <el-form :model="form" label-width="120px">
        <el-form-item label="proxy" title="需要重启">
          <el-input v-model="form.proxy" />
        </el-form-item>
        <el-form-item label="needProxy" title="需要重启">
          <el-switch v-model="form.needProxy" />
        </el-form-item>
        <el-form-item label="子窗口数量" title="最小值为常驻子窗口，最大值为最多创建的子窗口">
          <el-input-number v-model="picLimit1" /> ---
          <el-input-number v-model="picLimit2" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialog.save()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { nextTick, reactive, ref, watchEffect } from 'vue';
  import { forIn, keys } from 'lodash';
  import { getAllSet, setSetting } from '@/utils/functions';
  interface settingType {
    proxy?: string;
    needProxy?: boolean;
    picWinLimit: string;
    [x: string]: any;
  }
  const form = reactive<settingType>({
    proxy: '',
    needProxy: false,
    picWinLimit: JSON.stringify([0, 0]),
  });
  const picLimit1 = ref(0);
  const picLimit2 = ref(0);
  watchEffect(() => {
    const limit = JSON.parse(form.picWinLimit);
    picLimit1.value = limit[0] || 0;
    picLimit2.value = limit[1] || 0;
  });
  watchEffect(() => {
    if (picLimit1.value > picLimit2.value) {
      form.picWinLimit = JSON.stringify([picLimit2.value, picLimit1.value]);
    } else {
      form.picWinLimit = JSON.stringify([picLimit1.value, picLimit2.value]);
    }
  });
  const dialog = reactive({
    visible: false,
    show: async () => {
      const setJson = (await getAllSet()) as any;
      keys(form).forEach((key: string) => {
        const v = setJson[key];
        if (v !== undefined) {
          form[key] = v as any;
        }
      });
      dialog.visible = true;
    },
    save: () => {
      forIn(form, (value, key) => {
        setSetting(key, value);
      });
      dialog.visible = false;
    },
  });
  defineExpose({
    execute: () => {
      dialog.show();
    },
  });
</script>

<style scoped lang="less"></style>
