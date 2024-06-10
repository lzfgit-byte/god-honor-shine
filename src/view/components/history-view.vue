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
      ></GhsItem>
    </TransitionGroup>
    <a-empty v-if="items.length === 0" />
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import type { ViewedHistoryEntity } from '@ghs/constant';
  import type { PropType } from 'vue-demi';
  import type { BaseConfig } from '@ghs/types';
  import { generateKey } from '@ilzf/utils';
  import { f_listHistory } from '@/utils/business';
  import GhsItem from '@/components/item/ghs-item.vue';
  const props = defineProps({ webConfig: Object as PropType<BaseConfig>, showDetail: Function });

  const history = ref<ViewedHistoryEntity[]>([]);

  const initHistory = async () => {
    history.value = await f_listHistory();
  };

  const items = computed(() => history?.value.map((item) => JSON.parse(item.value)));

  onMounted(() => {
    initHistory();
  });
</script>

<style scoped lang="less"></style>
