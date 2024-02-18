<template>
  <div ref="messageRef" class="ghs-message" pos="absolute" flex>
    {{ infoRef }}
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue';
  import { ref } from 'vue-demi';
  import { computed } from 'vue';
  import { useMouseInElement } from '@vueuse/core';
  import type { MessageType } from '../types';
  import { color } from '../types';

  const props = defineProps({ info: String, type: String as PropType<MessageType>, index: Number });
  const messageRef = ref<HTMLDivElement>();
  const indexRef = ref(props.index || 0);
  const paddingTop = ref(12);
  const height = ref(16 + paddingTop.value * 2);
  const topBottom = computed(() => `${paddingTop.value}px`);
  const computedIndex = computed(() => indexRef.value * height.value + 10 * (indexRef.value + 1));
  const currentTop = computed(() => `${computedIndex.value}px`);
  const currentStartIndex = computed(() => `${computedIndex.value - 16 * 1.5}px`);
  const infoRef = ref(props.info);
  const { isOutside } = useMouseInElement(messageRef);

  const backgroundColor = computed(() => color[props.type || 'info'].back);
  const fontColor = computed(() => color[props.type || 'info'].color);
  const show = () => {
    messageRef.value.classList.remove('hideAnimate');
    messageRef.value.classList.add('showAnimate');
  };
  const hide = () => {
    messageRef.value.classList.add('hideAnimate');
    messageRef.value.classList.remove('showAnimate');
  };
  const update = (index?: number, info?: string) => {
    indexRef.value = index || indexRef.value;
    infoRef.value = info || infoRef.value;
  };
  const check = () => isOutside.value;
  defineExpose({ show, hide, update, check });
</script>

<style scoped lang="less">
  @startIndex: -100px;

  @keyframes showMsgAnimate {
    0% {
      top: v-bind(currentStartIndex);
      opacity: 0;
    }

    100% {
      top: v-bind(currentTop);
      opacity: 1;
    }
  }
  @keyframes hideMsgAnimate {
    0% {
      top: v-bind(currentTop);
      opacity: 1;
    }

    100% {
      top: v-bind(currentStartIndex);
      opacity: 0;
    }
  }
  .ghs-message {
    padding: v-bind(topBottom) 14px;
    left: 50%;
    line-height: 16px;
    border-radius: 8px;
    z-index: 9999;
    background: v-bind(backgroundColor);
    color: v-bind(fontColor);
    transition: top 0.3s linear;
    top: @startIndex;
    transform: translateX(-50%);
  }
  .showAnimate {
    animation: showMsgAnimate 0.3s linear forwards;
  }
  .hideAnimate {
    animation: hideMsgAnimate 0.3s linear forwards;
  }
</style>
