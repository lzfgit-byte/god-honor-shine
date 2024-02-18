<template>
  <div
    id="ghs-log-container"
    ref="logRef"
    class="ghs-log-container"
    absolute
    flex
    justify-start
    items-center
    cursor-pointer
    @click="handleClick"
  >
    <div w-full h-full flex justify-start items-center>{{ infoRef }}</div>
  </div>
  <div
    ref="dialogRef"
    class="ghs-log-container ghs-log-bigger"
    absolute
    flex
    flex-col
    justify-start
    items-center
    @dblclick="hideBigger"
  >
    <div
      class="ghs-log-title"
      w-full
      flex
      justify-end
      items-center
      color-white
      cursor-pointer
      @click="hideBigger"
    >
      <GhsIcon width="15px" height="15px" color="white"> <Close></Close></GhsIcon>
    </div>
    <div ref="scrollerRef" w-full class="ghs-log-body">
      <GhsScroller max-height="85vh" color="white">
        <div v-for="(item, index) in detailRef" :key="index" w-full p-t-1 p-b-1 flex>
          {{ item }}
        </div>
      </GhsScroller>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Close } from '@vicons/ionicons5';
  import type { GHSLogExpose } from './index';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';

  const props = defineProps({ log: String });
  const emits = defineEmits(['showDialog', 'hideDialog']);
  const infoRef = ref(props.log || '');
  const logRef = ref<HTMLDivElement>();
  const dialogRef = ref<HTMLDivElement>();
  const scrollerRef = ref<HTMLDivElement>();
  const detailRef = ref<string[]>([]);

  const showDialog = () => {
    dialogRef.value.classList.add('showDialog');
    dialogRef.value.classList.remove('hideDialog');
  };
  const handleClick = () => {
    showDialog();
    emits('showDialog');
  };
  const hideBigger = () => {
    dialogRef.value.classList.add('hideDialog');
    dialogRef.value.classList.remove('showDialog');
    emits('hideDialog');
  };
  const expose: GHSLogExpose = {
    log: (info) => {
      infoRef.value = info;
    },
    detail: (detail: string[]) => {
      detailRef.value = detail;
    },
    show: () => {
      logRef.value.classList.add('showLog');
      logRef.value.classList.remove('hideLog');
    },
    hide: () => {
      logRef.value.classList.add('hideLog');
      logRef.value.classList.remove('showLog');
    },
    showDialog,
  };
  defineExpose(expose);
</script>

<style scoped lang="less">
  @keyframes showAnimate {
    0% {
      bottom: -32px;
    }
    100% {
      bottom: 5px;
    }
  }
  @keyframes hideAnimate {
    0% {
      bottom: 5px;
    }
    100% {
      bottom: -32px;
    }
  }
  @keyframes dialogShowAnimate {
    0% {
      top: 100%;
    }
    100% {
      top: 4%;
    }
  }
  @keyframes dialogHideAnimate {
    0% {
      top: 4%;
    }
    100% {
      top: 100%;
    }
  }
  .ghs-log-container {
    box-sizing: border-box;
    z-index: 9999;
    height: 30px;
    bottom: -32px;
    background: #333;
    border-radius: 8px;
    margin: 0 1%;
    padding-left: 1%;
    width: 98%;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ghs-log-bigger {
    height: 90%;
    overflow: hidden;
    padding: 1%;
    top: 100%;
    .div {
      color: white;
    }
    .ghs-log-title {
      height: 20px;
    }
    .ghs-log-body {
      height: calc(100% - 30px);
      overflow: auto;
    }
  }
  .showLog {
    animation: showAnimate 0.3s linear forwards;
  }
  .hideLog {
    animation: hideAnimate 0.3s linear forwards;
  }
  .showDialog {
    animation: dialogShowAnimate 0.3s linear forwards;
  }
  .hideDialog {
    animation: dialogHideAnimate 0.3s linear forwards;
  }
</style>
