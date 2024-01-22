<template>
  <div :id="id" ref="notifyRef" absolute class="ghs-notification" pos="absolute" flex flex-col>
    <div class="ghsn-header" w-full flex items-center>
      <div class="ghsn-h-title" flex items-center justify-start h-full>
        <h2>{{ title }}</h2>
      </div>
      <div
        class="ghsn-h-extra"
        flex
        items-center
        justify-end
        h-full
        cursor-pointer
        @click="emits('close')"
      >
        <GhsIcon>
          <Close></Close>
        </GhsIcon>
      </div>
    </div>
    <div class="ghsn-body" w-full>
      <div class="ghsn-progress" w-full relative>
        <div class="ghsn-current-percentage-gray" absolute></div>
        <div class="ghsn-current-percentage" absolute></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue-demi';
  import { useMouseInElement } from '@vueuse/core';
  import { computed, onMounted, onUnmounted } from 'vue';
  import { Close } from '@vicons/ionicons5';
  import type { NotifyExpose } from '../types';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import bus from '@/utils/bus';

  const props = defineProps({ percentage: String, title: String, top: Number, index: Number });
  const emits = defineEmits(['close']);
  const id = new Date().getTime();
  const notifyRef = ref<HTMLDivElement>();
  const { isOutside, elementHeight } = useMouseInElement(notifyRef);
  const indexRef = ref(props.index || 0);
  const currentTop = computed(
    () => `${indexRef.value * elementHeight.value + 10 + indexRef.value * 10}px`
  );
  const percentageRef = ref(props.percentage || 0);
  const percentageWidth = computed(() => `${percentageRef.value}%`);
  const expose: NotifyExpose = {
    show: () => {
      notifyRef.value.classList.remove('hideNotify');
      notifyRef.value.classList.add('showNotify');
    },
    hide: () => {
      notifyRef.value.classList.add('hideNotify');
      notifyRef.value.classList.remove('showNotify');
    },
    update: (index, percentage, title) => {
      indexRef.value = index || indexRef.value;
      percentageRef.value = percentage || percentageRef.value;
    },
    check: () => isOutside.value,
    calculateNewPos: () => {
      const els = document.querySelectorAll('.ghs-notification');
      els.forEach((el, i) => {
        if (+el.id === id) {
          indexRef.value = i;
        }
      });
    },
  };
  onMounted(() => {
    bus.on('calculateNewPos', expose.calculateNewPos);
  });
  onUnmounted(() => {
    bus.off('calculateNewPos', expose.calculateNewPos);
  });

  defineExpose(expose);
</script>

<style scoped lang="less">
  @titleWidth: 80%;
  @keyframes showNotifyAnimate {
    0% {
      right: -330px;
    }
    100% {
      right: 10px;
    }
  }
  @keyframes hideNotifyAnimate {
    0% {
      right: 10px;
    }
    100% {
      right: 10px;
      opacity: 0;
      transform: translateY(-50%);
    }
  }
  .ghs-notification {
    width: 330px;
    right: -330px;
    top: v-bind(currentTop);
    padding: 15px 24px;
    box-shadow: 0 12px 32px 4px rgba(0, 0, 0, 0.04), 0 8px 20px rgba(0, 0, 0, 0.08);
    background: white;
    border-radius: 8px;
    transition: top 0.2s linear;
    z-index: 99999;
    .ghsn-header {
      .ghsn-h-title {
        width: @titleWidth;
        h2 {
          margin: 0 !important;
        }
      }
      .ghsn-h-extra {
        width: calc(100% - @titleWidth);
      }
    }
    .ghsn-body {
      color: #606266;
      padding-top: 5px;
    }
  }
  .showNotify {
    animation: showNotifyAnimate 0.3s linear forwards;
  }
  .hideNotify {
    animation: hideNotifyAnimate 0.3s linear forwards;
  }
  .ghsn-progress {
    padding: 5px 0;
    margin: 5px 0;
    .ghsn-current-percentage {
      height: 6px;
      background: #409eff;
      border-radius: 3px;
      width: v-bind(percentageWidth);
    }
    .ghsn-current-percentage-gray {
      height: 6px;
      background: #ebeef5;
      border-radius: 3px;
      width: 100%;
    }
  }
</style>
