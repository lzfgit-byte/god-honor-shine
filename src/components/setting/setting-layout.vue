<template>
  <SettingItem
    v-for="(item, index) in settings"
    :key="index"
    :icon="item.icon"
    :title="item.title"
    :is-show-margin="index < settings.length - 1"
  ></SettingItem>
</template>
<script setup lang="ts">
  import SettingItem from '@/components/setting/setting-item.vue';
  import useSettingStore from '@/store/useSettingStore';
  const { settings } = useSettingStore();
</script>

<style scoped lang="less"></style>
