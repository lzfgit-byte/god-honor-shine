<template>
  <div class="view-container" h-full w-full relative>
    <div class="view-action" w-full flex h-full items-center justify-end gap-1>
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
      <div w-full flex justify-between items-center class="slide-header" gap-1>
        <div class="header-btn" gap-1>
          <GhsButton m-r-2 @click="f_cache_suffix_clean()">清除缓存</GhsButton>
          <GhsButton @click="f_cache_suffix_clean(CacheFileType.html)">清除页面缓存</GhsButton>
        </div>
        <GhsIcon color="black" @click="slideShow = false">
          <Close></Close>
        </GhsIcon>
      </div>
      <div class="slide-body">
        <slot name="slide"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Close } from '@vicons/ionicons5';
  import { CacheFileType } from '@ghs/share';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import GhsButton from '@/components/button/ghs-button.vue';
  import { f_cache_suffix_clean } from '@/utils/functions';

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
