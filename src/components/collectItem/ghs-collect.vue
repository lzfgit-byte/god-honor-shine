<template>
  <div relative>
    <div flex justify-end items-center p-r-2 m-b-2 class="ghs-collect-layout">
      <GhsIcon size="15px" @click="layout = 'grid'">
        <AppsOutline></AppsOutline>
      </GhsIcon>
      <GhsIcon size="20px" m-l-1 @click="layout = 'list'">
        <ListOutline></ListOutline>
      </GhsIcon>
    </div>
    <GhsScroller :max-height="maxHeight">
      <template v-if="layout === 'list'">
        <GhsCollectItem
          v-for="item in cCollect"
          :key="item.jumpUrl"
          :info="item"
          @click="collectClick(item, imgClick)"
          @delete="collectDelete(JSON.stringify(item))"
        >
        </GhsCollectItem>
      </template>
      <template v-if="layout === 'grid'">
        <GhsItem
          v-for="item in cCollect"
          :key="item.jumpUrl"
          :title="item.title"
          :cover-img="item.coverImg"
          :jump-url="item.jumpUrl"
          :tags="item.tags"
          :flat-tags="item.flatTags"
          width="30.5%"
          height="100px"
          @img-click="collectClick(item, imgClick)"
        ></GhsItem>
      </template>
    </GhsScroller>
  </div>

  <GhsDialog></GhsDialog>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { PageItemType } from '@ghs/share';
  import { computed } from 'vue';
  import { AppsOutline, ListOutline } from '@vicons/ionicons5';
  import { ref } from 'vue-demi';
  import GhsCollectItem from '@/components/collectItem/ghs-collect-item.vue';
  import GhsDialog from '@/components/dialog/ghs-dialog.vue';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import GhsItem from '@/components/item/ghs-item.vue';
  const props = defineProps({
    collect: Array as PropType<PageItemType[]>,
    collectClick: Function as PropType<(item: PageItemType, click: Function) => void>,
    collectDelete: Function,
    imgClick: Function,
    maxHeight: String,
  });
  const layout = ref<'grid' | 'list'>('grid');
  const cCollect = computed(() => props.collect);
</script>

<style scoped lang="less">
  .ghs-collect-layout {
  }
</style>
