<template>
  <div class="ghs-tooltip-con" relative inline-block z-9999>
    <transition>
      <div v-if="commentVision" class="ghs-tp-comment-con" absolute :style="currentStyle">
        <div class="ghs-arrow" :style="currentArrowStyle" absolute w-8px h-8px></div>
        <div class="ghs-tp-comment">
          <slot name="comment"></slot>
        </div>
      </div>
    </transition>
    <div @mouseenter="commentVision = true" @mouseleave="commentVision = false">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue';
  import { ref } from 'vue-demi';
  import useDirection from './hooks/useDirection';
  import type { ToolTipDType } from './ToolTipType';

  const props = defineProps({
    direction: {
      type: String as PropType<ToolTipDType>,
      default: 't',
    },
  });
  const commentVision = ref(false);
  const { currentStyle, currentArrowStyle } = useDirection(props);
</script>

<style scoped lang="less">
  @backColor: #333;
  .ghs-tooltip-con {
    .ghs-tp-comment-con {
      padding: 5px;
    }
    .ghs-arrow {
      background-color: @backColor;
    }
    .ghs-tp-comment {
      background-color: @backColor;
      padding: 5px 5px;
      box-sizing: content-box;
      color: white;
      border-radius: 4px;
    }
  }
  /* 下面我们会解释这些 class 是做什么的 */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
