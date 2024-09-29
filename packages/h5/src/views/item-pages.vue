<template>
  <transition-group name="custom-classes" enter-active-class="animate__animated animate__pulse">
    <GhsItem
      v-for="(item, index) in items"
      :key="item.jumpUrl + index + generateKey()"
      :item="item"
      :width="webConfig?.imgWidth"
      :height="webConfig?.imgHeight"
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

  const { items, pagination, handlePageClick, handleSearch } = usePageState();
</script>

<style scoped></style>
