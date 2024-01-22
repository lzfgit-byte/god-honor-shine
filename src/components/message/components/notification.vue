<template>
  <div :id="id" ref="notifyRef" absolute class="ghs-notification" pos="absolute" flex flex-col>
    <div class="ghsn-header" w-full flex items-center>
      <div class="ghsn-h-title" flex items-center justify-start h-full>
        {{ title }}
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
      <GhsProgress v-if="percentage !== undefined" v-model:percentage="percentageRef"></GhsProgress>
      <div
        v-if="info"
        w-full
        style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
        :title="infoRef"
        >{{ infoRef }}</div
      >
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
  import GhsProgress from '@/components/progress/ghs-progress.vue';

  const props = defineProps({
    percentage: Number,
    title: String,
    info: String,
    top: Number,
    index: Number,
  });
  const emits = defineEmits(['close']);
  const id = new Date().getTime();
  const notifyRef = ref<HTMLDivElement>();
  const { isOutside, elementHeight } = useMouseInElement(notifyRef);
  const indexRef = ref(props.index || 0);
  const currentTop = computed(
    () => `${indexRef.value * elementHeight.value + 10 + indexRef.value * 10}px`
  );
  const percentageRef = ref(props.percentage || 0);
  const infoRef = ref(props.info || '');
  const expose: NotifyExpose = {
    show: () => {
      notifyRef.value.classList.remove('hideNotify');
      notifyRef.value.classList.add('showNotify');
    },
    hide: () => {
      notifyRef.value.classList.add('hideNotify');
      notifyRef.value.classList.remove('showNotify');
    },
    update: (opt) => {
      indexRef.value = opt?.index || indexRef.value;
      percentageRef.value = opt.percentage || percentageRef.value;
      infoRef.value = opt.info || infoRef.value;
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
        font-weight: 600;
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
</style>
