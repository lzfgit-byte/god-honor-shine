<template>
  <div id="more-hentai">
    <div class="navigation">
      <ol class="wp-paginate font-inherit">
        <li v-for="item in pageInfos" :key="item">
          <span v-if="item.isCurrent" class="page current">{{ item.pageNumber }}</span>
          <span v-else-if="item.pageNumber === '...'">{{ item.pageNumber }}</span>
          <span v-else class="page" @click="handleClick(item.jumpUrl)">
            {{ item.pageNumber }}
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, PropType, defineEmits } from 'vue';
  import { pageInfo } from '@/hentai-word/type/hentai-word-type';
  const props = defineProps({
    pageInfos: Array as PropType<pageInfo[]>,
  });
  const emits = defineEmits(['changePage']);
  const handleClick = (url: string) => {
    emits('changePage', url);
  };
</script>

<style scoped lang="less">
  #more-hentai {
    text-align: center;
    float: right;
    .wp-paginate {
      font-size: 18px;
      border-radius: 0;
      padding: 0;
      margin: 0;
    }
    .current {
      background: #fff;
      color: #000;
      font-weight: 700;
      border: 2px solid #000;
      padding: 5px 10px;
      border-radius: 0;
    }
    li {
      float: left;
      height: 40px;
      line-height: 3em;
      display: inline;
      list-style: none;
    }
    span {
      background: #fff;
      padding: 6px 12px;
      border: 1px solid #ccc;
      color: #666;
      margin-right: 4px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
    }
  }
  ul,
  ol {
    list-style: none;
  }
</style>
