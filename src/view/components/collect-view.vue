<template>
  <div h-full w-full> {{ items }} </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { CollectEntity } from '@ghs/constant';
  import { useVModel } from '@vueuse/core';
  import { computed } from 'vue';

  const props = defineProps({ collects: Array as PropType<CollectEntity[]> });
  const emits = defineEmits(['update:collects']);
  const collectsModel = useVModel(props, 'collects', emits);
  const items = computed(() => collectsModel.value.map((item) => JSON.parse(item.value)));
</script>

<style scoped lang="less"></style>
