<template>
  <component :is="currentCompent"> </component>
  <div class="floatBall">
    <a-dropdown :get-popup-container="getPopupContainer">
      <template #overlay>
        <a-menu @click="handlerBallClick">
          <a-menu-item key="1"> hentaiword</a-menu-item>
          <a-menu-item key="2"> sexy-photo</a-menu-item>
          <a-menu-item key="3">18comic </a-menu-item>
          <a-menu-item key="4">rule34 </a-menu-item>
          <a-menu-item key="5">setting </a-menu-item>
        </a-menu>
      </template>
      <a-button type="primary"> 切换 </a-button>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
  import HentaiWord from '@/hentai-word/view/hentai-word-index.vue';
  import ComicHome from '@/18-comic/view/comic-index.vue';
  import SexPhoto from '@/sexy-photo/view/sex-photo.vue';
  import SettingTemplate from '@/setting/setting-template.vue';
  import { Dropdown as ADropdown, Menu as AMenu, MenuItem as AMenuItem } from 'ant-design-vue';
  import { Button as AButton } from 'ant-design-vue';
  import { computed, ref, shallowRef } from 'vue';
  import Rule34 from '@/rule34/rule-34.vue';
  import bus from '@/utils/bus';
  import { useTitle } from '@vueuse/core';

  const currentCompent = shallowRef(HentaiWord);
  const handlerBallClick = (e: any) => {
    if (e.key === '1') {
      currentCompent.value = HentaiWord;
    } else if (e.key === '2') {
      currentCompent.value = SexPhoto;
    } else if (e.key === '3') {
      currentCompent.value = ComicHome;
    } else if (e.key === '4') {
      currentCompent.value = Rule34;
    } else if (e.key === '5') {
      currentCompent.value = SettingTemplate;
    }
  };

  const getPopupContainer = () => document.body;
  //标题信息处理
  const messages = ref<any>('');
  const title = computed(() => {
    return !messages.value ? 'ghs' : `ghs [${messages.value}] `;
  });

  useTitle(title);
  bus.on('msg-main', (msg) => {
    messages.value = msg;
  });
</script>
<style lang="less" scoped>
  .floatBall {
    position: fixed;
    left: -45px;
    top: 10px;
    z-index: 1000;
    opacity: 0.2;
    &:hover {
      opacity: 1;
    }
  }
</style>
