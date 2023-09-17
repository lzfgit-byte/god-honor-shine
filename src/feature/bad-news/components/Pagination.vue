<template>
  <div class="pagination-container">
    <div
      v-for="(item, index) in pages"
      :key="index"
      class="pages"
      :class="{ currentPage: item.isCurrent }"
      @click="handlerClick(item)"
    >
      {{ item.page }}
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { pageType } from '@/feature/bad-news/type/types';

  defineProps({ pages: Array as PropType<pageType[]> });
  const emits = defineEmits(['jump']);
  const handlerClick = (page: pageType) => {
    if (page.isCurrent) {
      return;
    }
    emits('jump', page.jumpUrl);
  };
</script>

<style scoped lang="less">
  .pagination-container {
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 20px;
    background-color: #fff;
    color: #555;
    .pages {
      display: inline-flex;
      cursor: pointer;
      font-weight: 700;
      padding: 4px 8px;
    }
    .currentPage {
      background-color: #555;
      border-color: #555;
      color: #fff;
    }
  }
</style>
