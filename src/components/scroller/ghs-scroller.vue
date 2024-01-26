<template>
  <div w-full>
    <div ref="el" w-full class="ghs-scroller" relative>
      <slot></slot>
    </div>
    <transition>
      <div
        v-if="!arrivedState.bottom"
        absolute
        flex
        justify-center
        items-center
        bottom-2
        class="ghs-scroller-icon"
      >
        <GhsIcon width="15px" height="15px">
          <ChevronDownCircleOutline></ChevronDownCircleOutline>
        </GhsIcon>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { ref } from 'vue-demi';
  import { useScroll } from '@vueuse/core';
  import { ChevronDownCircleOutline } from '@vicons/ionicons5';
  import GhsIcon from '@/components/icon/ghs-icon.vue';

  const props = defineProps({ maxHeight: String });
  const maxHeight = computed(() => props.maxHeight || '30vh');
  const el = ref<HTMLElement | null>(null);
  const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
</script>

<style scoped lang="less">
  .ghs-scroller {
    overflow: auto;
    height: v-bind(maxHeight);
  }
  @keyframes downAndUp {
    0% {
      transform: translateX(-50%) translateY(-10%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .ghs-scroller-icon {
    left: 50%;
    pointer-events: none;
    transform: translateX(-50%);
    animation: downAndUp 0.3s linear infinite;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
