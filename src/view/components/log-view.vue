<template>
  <div h-full w-full overflow-auto>
    <a-row v-for="(item, index) in logs" :key="index">
      <a-col :span="24">{{ item }}</a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import useGlobalState from '@/hooks/use-global-state';

  const { logs } = useGlobalState();
</script>

<style scoped lang="less"></style>
