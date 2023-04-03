<template>
  <div class="container">
    <div
      v-for="item in pageInfos"
      :key="item"
      :class="{ item: true, active: (item as any).current }"
      @click="handlerClick(item)"
    >
      {{ (item as any).text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { pageInfo } from '@/rule34/type/rule34Type';

  const props = defineProps({
    pageInfos: { type: Array as PropType<pageInfo[]>, default: () => [] },
  });
  const emits = defineEmits(['pageChange']);
  const handlerClick = (item: pageInfo) => {
    emits('pageChange', item.jumpUrl);
  };
</script>

<style scoped lang="less">
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 5px;
    .item {
      width: 40px;
      margin: 5px 0 0 5px;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center;
      min-width: 40px;
      height: 40px;
      border-radius: 10px;
      background-color: #3b444b;
      color: #fff;
      font-size: 16px;
      line-height: 1.2;
      text-transform: uppercase;
      transition: background 0.3s;
      padding: 0 5px;
      cursor: pointer;
    }
    .active {
      background-color: #75899a;
      pointer-events: none;
      cursor: default;
      text-decoration: none;
    }
  }
</style>
