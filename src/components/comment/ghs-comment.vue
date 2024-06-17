<template>
  <div flex w-full m-2>
    <a-tooltip placement="top">
      <template #title>
        <span>{{ datetime }}</span>
      </template>
      <div p-2 style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px; border-radius: 8px">
        {{ comment }}
      </div>
    </a-tooltip>
  </div>
</template>
<script setup lang="ts">
  defineProps({ datetime: String, comment: String });
</script>

<style scoped lang="less"></style>
