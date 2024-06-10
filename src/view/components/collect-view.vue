<template>
  <div h-full w-full>
    <GhsItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :width="webConfig.imgWidth"
      :height="webConfig.imgHeight"
      :on-close-click="() => 1"
      @img-click="showDetail(item)"
    ></GhsItem>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { CollectEntity } from '@ghs/constant';
  import { useVModel } from '@vueuse/core';
  import { computed } from 'vue';
  import type { BaseConfig } from '@ghs/types';
  import GhsItem from '@/components/item/ghs-item.vue';

  const props = defineProps({
    collects: Array as PropType<CollectEntity[]>,
    webKey: String,
    webConfig: Object as PropType<BaseConfig>,
    showDetail: Function,
  });
  const emits = defineEmits(['update:collects']);
  const collectsModel = useVModel(props, 'collects', emits);
  const items = computed(() => collectsModel.value.map((item) => JSON.parse(item.value)));
</script>

<style scoped lang="less"></style>
