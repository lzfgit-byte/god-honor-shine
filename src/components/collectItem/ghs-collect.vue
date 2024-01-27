<template>
  <GhsCollectItem
    v-for="item in cCollect"
    :key="item.jumpUrl"
    :info="item"
    @click="collectClick(item, imgClick)"
    @delete="collectDelete(JSON.stringify(item))"
  >
  </GhsCollectItem>

  <GhsDialog></GhsDialog>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { PageItemType } from '@ghs/share';
  import { computed } from 'vue';
  import GhsCollectItem from '@/components/collectItem/ghs-collect-item.vue';
  import GhsDialog from '@/components/dialog/ghs-dialog.vue';
  const props = defineProps({
    collect: Array as PropType<PageItemType[]>,
    collectClick: Function as PropType<(item: PageItemType, click: Function) => void>,
    collectDelete: Function,
    imgClick: Function,
  });
  const cCollect = computed(() => props.collect);
</script>

<style scoped lang="less"></style>
