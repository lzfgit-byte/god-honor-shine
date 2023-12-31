<template>
  <div class="container">
    <slot></slot>
    <div
      v-for="(item, index) in pageInfos"
      :key="index"
      class="item"
      :class="{ active: (item as any).current }"
      :title="item.jumpUrl"
      @click="handlerClick(item)"
    >
      {{ (item as any).text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { ref } from 'vue';
  import type { pageInfo } from '@/feature/rule34/type/rule34Type';
  const props = defineProps({
    pageInfos: { type: Array as PropType<pageInfo[]>, default: () => [] },
  });

  const emits = defineEmits(['pageChange']);
  const currentPage = ref(1);
  const handlerClick = (item: pageInfo) => {
    if (item.text) {
      if (item.jumpUrl === 'https://rule34video.com#search') {
        const fa: string = item.fromAlbums as any;
        fa?.split(';').forEach((iStr) => {
          let split = iStr.split(':');
          if (split.length === 2 && split[0] === 'from_videos+from_albums') {
            currentPage.value = +split[1];
          }
        });
      } else {
        currentPage.value = +item.text;
      }
    }
    emits('pageChange', item.jumpUrl, currentPage.value);
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
