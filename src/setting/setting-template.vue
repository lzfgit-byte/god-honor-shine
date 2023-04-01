<template>
  <div class="container">
    <div class="formContainer">
      <a-form
        :model="formState"
        :label-col="{ style: { width: '150px' } }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item v-for="item in resSet" :key="item" :label="item.name">
          <a-input v-if="!isBoolean(formState[item.name])" v-model:value="formState[item.name]" />
          <a-switch v-else v-model:checked="formState[item.name]" />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { exportFunc } from '@/utils/ipc';
  import { reactive, ref, watch } from 'vue';
  import { keys } from 'lodash';
  import {
    Form as AForm,
    FormItem as AFormItem,
    Input as AInput,
    Switch as ASwitch,
  } from 'ant-design-vue';

  const { getAllSetting }: { getAllSetting: () => Promise<any> } = exportFunc;
  const setSetting: (key: string, value: any) => any = exportFunc['setSetting'];
  const canSetEmu = ['proxy', 'needProxy'];

  const isBoolean = (val: any) => typeof val === 'boolean';

  const resSet = ref<any[]>([]);
  const formState = reactive<any>({});
  getAllSetting().then((res) => {
    keys(res).forEach((key: any) => {
      if (canSetEmu.includes(key)) {
        resSet.value.push({ name: key, value: res[key] });
        formState[key] = res[key];
      }
    });
  });
  watch(formState, () => {
    keys(formState).forEach((key: any) => {
      setSetting(key, formState[key]);
    });
  });
</script>

<style scoped lang="less">
  .container {
    width: 100%;
    display: flex;
    padding-top: 10px;
    .formContainer {
      margin: auto;
    }
  }
</style>
