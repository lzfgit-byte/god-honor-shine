<template>
  <div
    class="ghs-collect-container"
    relative
    h-full
    flex
    justify-start
    items-center
    @click="handlerClick"
  >
    <div class="ghs-img" h-full>
      <GhsImg :url="info.coverImg"></GhsImg>
    </div>
    <div class="ghs-title" flex justify-start items-center> <GhsText :value="info.title" /></div>
    <div absolute right-4>
      <GhsIcon @click.stop="handleDelete"><Close></Close></GhsIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { PageItemType } from '@ghs/share';
  import { Close } from '@vicons/ionicons5';
  import GhsImg from '@/components/image/ghs-img.vue';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import GhsText from '@/components/text/ghs-text.vue';

  const props = defineProps({
    info: Object as PropType<PageItemType>,
  });
  const emits = defineEmits(['click', 'delete']);
  const handlerClick = () => {
    emits('click', props.info);
  };
  const handleDelete = () => {
    emits('delete', props.info);
  };
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .ghs-collect-container {
    height: 40px;
    padding: 5px;
    margin: 0 5px 5px 5px;
    gap: 5px;
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    border-radius: @radius;
    &:hover {
      background-color: #e2e3e5;
    }
  }
  .ghs-title {
    width: 80%;
  }
</style>
