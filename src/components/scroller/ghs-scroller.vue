<template>
  <div w-full relative>
    <div ref="el" w-full class="ghs-scroller" relative>
      <slot></slot>
    </div>
    <transition>
      <div
        v-if="!arrivedState.bottom && show"
        absolute
        flex
        justify-center
        items-center
        bottom-2
        class="ghs-scroller-icon"
      >
        <GhsIcon width="15px" height="15px" :color="colorComp">
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

  const props = defineProps({ maxHeight: String, color: String });
  const maxHeight = computed(() => props.maxHeight || '30vh');
  const el = ref<HTMLDivElement>();
  const { arrivedState } = useScroll(el);
  const colorComp = computed(() => props.color || '#333');
  const show = computed(() => {
    const d: HTMLDivElement[] = Array.from(el?.value?.children || []) as any;
    let total = 0;
    d?.forEach((i) => {
      total += i.clientHeight;
    });
    return total > el?.value?.offsetHeight;
  });
</script>

<style scoped lang="less">
  .ghs-scroller {
    overflow: auto;
    height: v-bind(maxHeight);
  }
  .scroller-container {
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
