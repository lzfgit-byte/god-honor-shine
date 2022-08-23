<template>
  <component :is="currentCompent"> </component>
  <div class="floatBall">
    <a-dropdown :get-popup-container="getPopupContainer">
      <template #overlay>
        <a-menu @click="handlerBallClick">
          <a-menu-item key="1"> hentaiword</a-menu-item>
          <a-menu-item key="2"> sexy-photo</a-menu-item>
          <a-menu-item key="3">18comic </a-menu-item>
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
  import { Dropdown as ADropdown, Menu as AMenu, MenuItem as AMenuItem } from 'ant-design-vue';
  import { Button as AButton } from 'ant-design-vue';
  import { shallowRef } from 'vue';

  const currentCompent = shallowRef(HentaiWord);
  const handlerBallClick = (e: any) => {
    if (e.key === '1') {
      currentCompent.value = HentaiWord;
    } else if (e.key === '2') {
      currentCompent.value = SexPhoto;
    } else if (e.key === '3') {
      currentCompent.value = ComicHome;
    }
  };
  const getPopupContainer = () => document.body;
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
