<template>
  <div class="view-container" h-full w-full relative>
    <div
      v-if="loading"
      absolute
      h-full
      w-full
      z-2
      flex
      justify-center
      items-center
      class="view-loading"
    >
      <div class="loading-svg">
        <Loading :height="50" :width="50"></Loading>
      </div>
    </div>
    <div class="view-action" w-full flex h-full items-center justify-end gap-1>
      <slot name="action"></slot>
    </div>
    <div class="view-body" w-full relative>
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
      z-4
      @mouseleave="handleMouseOut"
    >
      <div w-full flex justify-between items-center class="slide-header" gap-1>
        <div class="header-btn" gap-1>
          <GhsButton m-r-2 @click="cacheClean">清除缓存</GhsButton>
          <GhsButton @click="cleanHtml">清除页面缓存</GhsButton>
        </div>
        <GhsIcon color="black" @click="slideShow = false">
          <Close></Close>
        </GhsIcon>
      </div>
      <div w-full flex justify-between items-center m-b-2 m-l-2>
        <GhsTag type="info">已使用的缓存大小:{{ cacheDirSize }}</GhsTag>
      </div>
      <div class="slide-body" p-l-2 p-r-2>
        <slot name="slide"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Close } from '@vicons/ionicons5';
  import { CacheFileType, executeFunc } from '@ghs/share';
  import { useVModel } from '@vueuse/core';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import GhsButton from '@/components/button/ghs-button.vue';
  import { f_cache_dir_size, f_cache_suffix_clean } from '@/utils/functions';
  import Loading from '@/components/layout/components/loading.vue';
  import GhsTag from '@/components/tag/ghs-tag.vue';

  const props = defineProps({ reload: Function, loading: Boolean });
  const emits = defineEmits(['update:loading']);
  const loading = useVModel(props, 'loading', emits);

  const slideShow = ref(false);
  const enterShow = ref(false);
  const cacheDirSize = ref();
  const handleMouseEnter = async () => {
    enterShow.value = true;
    slideShow.value = true;
    cacheDirSize.value = await f_cache_dir_size();
  };
  const handleMouseOut = () => {
    slideShow.value = false;
  };
  const cacheClean = async () => {
    await f_cache_suffix_clean();
    executeFunc(props.reload);
  };
  const cleanHtml = async () => {
    await f_cache_suffix_clean(CacheFileType.html);
    executeFunc(props.reload);
  };
</script>

<style scoped lang="less">
  @import './styles/view-layout';
</style>
