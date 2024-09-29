<template>
  <transition-group name="custom-classes" enter-active-class="animate__animated animate__pulse">
    <GhsItem
      v-for="(item, index) in items"
      :key="item.jumpUrl + index + generateKey()"
      :item="item"
      :width="`${parseInt(webConfig?.imgWidth) * widthAdapter(webConfig?.imgWidth)}px`"
      :height="`${parseInt(webConfig?.imgHeight) * widthAdapter(webConfig?.imgWidth)}px`"
      :collect-sequence="collects?.length"
      @img-click="showDetail(item)"
      @up-collect="updateCollects"
    ></GhsItem>
  </transition-group>
</template>
<script setup lang="ts">
  import { generateKey } from '@ilzf/utils';
  import usePageState from '@/hook/use-page-state';
  import GhsItem from '@/components/item/ghs-item.vue';
  import useCollect from '@/hook/use-collect';
  import { calcWidthAdapter } from '@/utils/kit-util';
  import useFeature from '@/hook/use-feature';

  const widthAdapter = (width: string) => calcWidthAdapter(width);

  const { items, pagination, handlePageClick, handleSearch, webConfig } = usePageState();
  const { updateCollects, collects } = useCollect();
  const { showDetail, drawerOpen, handleDrawOpen, handleAddCode, handleEditCode, clearLogs } =
    useFeature();
</script>

<style scoped></style>
