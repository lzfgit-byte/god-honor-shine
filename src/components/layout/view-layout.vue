<template>
  <div class="view-container" h-full w-full relative>
    <div class="view-action" w-full flex h-full items-center justify-end>
      <slot name="action"></slot>
    </div>
    <div class="view-body" w-full>
      <slot name="body"></slot>
    </div>
    <div z-99 class="slideTrigger" pos="absolute right-0 " @mouseenter="handleMouseEnter"></div>
    <div
      v-show="enterShow"
      class="view-slide"
      :class="{ slideShowSlide: slideShow, hideSlide: !slideShow }"
      h-full
      absolute
      top-0
      @mouseleave="handleMouseOut"
    >
      <div absolute right-4 top-4 h-4 w-4 cursor-pointer @click="slideShow = false">
        <Close></Close>
      </div>
      <slot name="slide"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Close } from '@vicons/ionicons5';

  const slideShow = ref(false);
  const enterShow = ref(false);
  const handleMouseEnter = () => {
    enterShow.value = true;
    slideShow.value = true;
  };
  const handleMouseOut = () => {
    slideShow.value = false;
  };
</script>

<style scoped lang="less">
  @import './styles/view-layout';
</style>
