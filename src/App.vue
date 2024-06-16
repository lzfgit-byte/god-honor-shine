<template>
  <a-config-provider :locale="zhCN">
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
    <GhsMenu></GhsMenu>
    <ImgViewer ref="imgViewerRef"></ImgViewer>
    <GhsPlayer ref="videoGlobalRef"></GhsPlayer>
    <WebConfigView ref="webConfigRef"></WebConfigView>
  </a-config-provider>
</template>
<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import GhsMenu from '@/components/menu/ghs-menu.vue';
  import MainLayout from '@/components/layout/main-layout.vue';
  import ImgViewer from '@/components/imgViewer/img-viewer.vue';
  import useGlobalRef from '@/hooks/use-global-ref';
  import GhsPlayer from '@/components/player/ghs-player.vue';
  import WebConfigView from '@/view/components/web-config-view.vue';
  const { imgViewerRef, videoGlobalRef, webConfigRef } = useGlobalRef();
</script>

<style lang="less">
  @import '@/styles/style';
</style>
