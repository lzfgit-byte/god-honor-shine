<template>
  <div
    v-for="item in detail.contents"
    :key="item.link"
    w-full
    flex-inline
    justify-between
    items-center
    p-2
    class="c18-container"
    @click="emits('click', item)"
  >
    <div class="c18-title" flex-inline><GhsText :value="item.title" /></div>
    <div class="c18-time" flex justify-end>{{ item.time }}</div>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { Comic18Detail } from '@ghs/share';
  import GhsText from '@/components/text/ghs-text.vue';
  defineProps({ detail: Object as PropType<Comic18Detail> });
  const emits = defineEmits(['click']);
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .c18-container {
    cursor: pointer;
    border-radius: @radius;
    &:hover {
      background-color: white;
      color: black;
    }
    .c18-title {
      width: calc(100% - 100px);
    }
    .c18-time {
      width: 100px;
    }
  }
</style>
