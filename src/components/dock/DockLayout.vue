<template>
  <div v-for="(item, index) in apps" :key="index">{{ item.name }}</div>
</template>
<script setup lang="ts">
  import { f_getWebApps } from '@/apis/index-controller';
  import useDockStore from '@/store/useDockStore';
  const { apps, setApps } = useDockStore();
  const init = async () => {
    const webApps = await f_getWebApps();
    setApps(webApps);
    console.log('webapps', webApps);
    console.log('apps', apps);
  };
  init();
</script>

<style scoped lang="less"></style>
