<template>
  <div h-full w-full>
    <TransitionGroup name="list">
      <GhsItem
        v-for="(item, index) in items"
        :key="`${generateKey(`${index}`)}`"
        :item="item"
        :width="webConfig.imgWidth"
        :height="webConfig.imgHeight"
        :on-close-click="() => 1"
        @img-click="showDetail(item)"
        @up-collect="props?.upCollect"
      ></GhsItem>
    </TransitionGroup>
    <a-empty v-if="items.length === 0" />
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { CollectEntity } from '@ghs/constant';
  import { useVModel } from '@vueuse/core';
  import { computed } from 'vue';
  import type { BaseConfig } from '@ghs/types';
  import { generateKey } from '@ilzf/utils';
  import GhsItem from '@/components/item/ghs-item.vue';

  const props = defineProps({
    collects: Array as PropType<CollectEntity[]>,
    webKey: String,
    webConfig: Object as PropType<BaseConfig>,
    showDetail: Function,
    upCollect: Function,
  });
  const emits = defineEmits(['update:collects']);
  const collectsModel = useVModel(props, 'collects', emits);
  const items = computed(() => collectsModel.value.map((item) => JSON.parse(item.value)));
</script>

<style scoped lang="less">
  .list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-leave-active {
    position: absolute;
  }
</style>
