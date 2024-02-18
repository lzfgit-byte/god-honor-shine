<template>
  <div
    v-if="loading_"
    absolute
    h-full
    w-full
    z-2
    flex
    justify-center
    items-center
    class="view-loading"
  >
    <div class="loading-svg" @click="loading_ = false">
      <Loading :height="50" :width="50"></Loading>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Loading from '@/components/layout/components/loading.vue';
  const props = defineProps({ loading: Boolean });

  const emits = defineEmits(['update:loading']);
  const loading_ = useVModel(props, 'loading', emits);
</script>

<style scoped lang="less">
  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }
  .view-loading {
    background: rgba(0, 0, 0, 0.53);
    .loading-svg {
      width: 50px;
      height: 50px;
      animation: loading 2s linear infinite;
      cursor: pointer;
    }
  }
</style>
