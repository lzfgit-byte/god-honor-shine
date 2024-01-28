<template>
  <div class="view-container" h-full w-full relative>
    <GhsLoading v-model:loading="loading_"></GhsLoading>
    <div
      class="view-action"
      w-full
      flex
      h-full
      items-center
      justify-end
      gap-1
      @click="slideShow = false"
    >
      <slot name="action"></slot>
    </div>
    <div class="view-body" w-full relative @click="slideShow = false">
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
        <div class="header-btn">
          <GhsButton m-r-2 @click="cacheClean">清除缓存</GhsButton>
          <GhsButton m-r-2 @click="cleanHtml">清除页面缓存</GhsButton>
          <GhsButton m-r-2 @click="checkLog">查看日志</GhsButton>
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
  import { onMounted } from 'vue-demi';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import GhsButton from '@/components/button/ghs-button.vue';
  import { f_cache_dir_size, f_cache_suffix_clean, f_logger_db_list } from '@/utils/functions';
  import GhsTag from '@/components/tag/ghs-tag.vue';
  import { GHSClassLog } from '@/components/log';
  import GhsLoading from '@/components/loading/ghs-loading.vue';

  const props = defineProps({ reload: Function, loading: Boolean, initSlideShow: Boolean });
  const emits = defineEmits(['update:loading']);
  const loading_ = useVModel(props, 'loading', emits);
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
  const checkLog = async () => {
    const { detail, showDialog } = await GHSClassLog?.log();
    showDialog();
    const data = await f_logger_db_list();
    detail(data.map((i) => i.value));
  };
  onMounted(() => {
    slideShow.value = props.initSlideShow;
    enterShow.value = props.initSlideShow;
  });
</script>

<style scoped lang="less">
  @import './styles/view-layout';
</style>
