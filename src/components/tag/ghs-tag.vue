<template>
  <div v-if="info.title" class="ghs-tag-container" flex-inline justify-center items-center>
    {{ info.title }}
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { PageTags } from '@ghs/share';

  defineProps({ info: Object as PropType<PageTags> });
</script>

<style scoped lang="less">
  .ghs-tag-container {
    padding: 0.1rem 0.2rem;
    background-color: rgba(51, 51, 51, 0.87);
    color: white;
    font-size: 0.8rem;
    border-radius: 0.2rem;
  }
</style>
