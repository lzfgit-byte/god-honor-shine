<template>
  <DockItem
    v-for="(item, index) in apps"
    :key="index"
    :name="item.name"
    :icon="item.icon"
    :show-margin-right="index < apps.length - 1"
  ></DockItem>
</template>
<script setup lang="ts">
  import { f_getWebApps } from '@/apis/index-controller';
  import useDockStore from '@/store/useDockStore';
  import DockItem from '@/components/dock/DockItem.vue';
  const { apps, setApps } = useDockStore();
  const init = async () => {
    const webApps = await f_getWebApps();
    setApps(webApps);
  };
  init();
</script>

<style scoped lang="less"></style>
