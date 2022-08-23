<template>
  <a-spin :spinning="spinning">
    <viewer :images="images">
      <img v-for="src in images" :key="src" class="adjustImg" width="200" :src="src" />
    </viewer>
  </a-spin>

  <div class="floatBall" @click="handlerBallClick"></div>
  <div class="floatBallReload" @click="reload"></div>
  <a-drawer
    v-model:visible="drawer.visible"
    class="custom-class"
    style="color: red"
    title="搜索与标签"
    placement="right"
  >
    <div>
      <a-row>
        <a-col :span="24">
          <a-space>
            <a-input-search
              v-model:value="drawer.searchValue"
              placeholder="input search text"
              style="width: 200px"
              @search="drawer.search"
            />
            <a-button @click="reload">搜索</a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="4">
          <a-tag>页码</a-tag>
        </a-col>
        <a-col span="20">
          <a-input v-model:value="num" placeholder="输入展示条数" />
        </a-col>
      </a-row>
      <a-row>
        <a-tag>是否r18</a-tag>
        <a-radio-group v-model:value="r18">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
          <a-radio :value="2">混合</a-radio>
        </a-radio-group>
      </a-row>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
  import { inject, ref, defineExpose, reactive } from 'vue';
  import { httpFunc } from '@/18-comic/utils/get18ComicFunc';
  const { axiosGet } = httpFunc(inject);
  import { loliconUrl } from '@/sexy-photo/type/sex-photo-type';
  import { loliconGetType, loliconGetResType } from '@/sexy-photo/type/sex-photo-type';
  import 'viewerjs/dist/viewer.css';
  import { component as Viewer } from 'v-viewer';
  import { Row as ARow, InputSearch as AInputSearch, Button as AButton } from 'ant-design-vue';
  import { Col as ACol, Tag as ATag, Space as ASpace, Drawer as ADrawer } from 'ant-design-vue';
  import { RadioGroup as ARadioGroup, Radio as ARadio, Input as AInput } from 'ant-design-vue';
  import { Spin as ASpin } from 'ant-design-vue';
  const num = ref(10);
  const r18 = ref(1);
  const spinning = ref(true);
  const getLoliImgs = (option: loliconGetType) => {
    return axiosGet(loliconUrl, option);
  };
  const images = ref();

  const loadImags = (option: loliconGetType) => {
    spinning.value = true;
    option.num = num.value;
    option.r18 = r18.value;
    getLoliImgs(option)
      .then((res) => {
        const data: [x: loliconGetResType] = res.data;
        images.value = data.map((item) => item?.urls?.original);
        spinning.value = false;
      })
      .catch(() => {
        console.log();
      });
  };
  loadImags({});
  const drawer = reactive({
    visible: false,
    searchValue: '',
    search: () => {
      loadImags({ tag: drawer.searchValue });
    },
  });
  const handlerBallClick = () => {
    drawer.visible = true;
  };
  const reload = () => {
    loadImags({ tag: drawer.searchValue });
  };
  defineExpose({ loadImags });
</script>

<style scoped lang="less">
  :deep(.adjustImg) {
    margin: 10px;
  }
  .floatBall {
    position: fixed;
    border: 16px solid #16d05f;
    right: 10px;
    top: 10px;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
  }
  .floatBallReload {
    position: fixed;
    border: 16px solid #f8e906;
    right: 10px;
    top: 50px;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
  }
</style>
