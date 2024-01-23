<template>
  <div class="ghsn-progress" w-full relative>
    <div class="ghsn-current-percentage-gray" absolute></div>
    <div class="ghsn-current-percentage" absolute></div>
  </div>
</template>
<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { computed } from 'vue';

  const props = defineProps({ percentage: Number });
  const emits = defineEmits(['update:percentage']);
  const per = useVModel(props, 'percentage', emits);
  const percentageWidth = computed(() => `${per.value || 0}%`);
</script>

<style scoped lang="less">
  .ghsn-progress {
    padding: 5px 0;
    margin: 5px 0;
    .ghsn-current-percentage {
      height: 6px;
      background: #409eff;
      border-radius: 3px;
      width: v-bind(percentageWidth);
      transition: width 0.2s linear;
    }
    .ghsn-current-percentage-gray {
      height: 6px;
      background: #ebeef5;
      border-radius: 3px;
      width: 100%;
    }
  }
</style>
