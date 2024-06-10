<template>
  <div h-full w-full>
    <GhsTag
      v-for="(item, index) in tags"
      :key="index"
      :info="item"
      type="waring"
      :show-gap="true"
    ></GhsTag>
    <a-empty v-if="tags.length === 0" />
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { Tag } from '@ghs/types';
  import GhsTag from '@/components/tag/ghs-tag.vue';

  const props = defineProps({ tags: Array as PropType<Tag[]> });
</script>

<style scoped lang="less"></style>
