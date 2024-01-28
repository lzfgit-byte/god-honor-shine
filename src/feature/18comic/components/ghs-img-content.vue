<template>
  <div flex flex-col>
    <div w-full flex m-b-2>
      <GhsText :value="detail?.detail" />
    </div>
    <GhsScroller max-height="80vh">
      <div
        v-for="item in contents"
        :key="item.link"
        w-full
        flex-inline
        justify-between
        items-center
        p-2
        class="c18-container"
        @click="showDetail(item)"
      >
        <div class="c18-title" flex-inline><GhsText :value="item?.title" /></div>
        <div class="c18-time" flex justify-end>{{ item.time }}</div>
      </div>
    </GhsScroller>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { Comic18Detail, ComicReader } from '@ghs/share';

  import type { Comic18Content } from '@ghs/share/src';
  import { computed } from 'vue';
  import { useVModel } from '@vueuse/core';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  import GhsText from '@/components/text/ghs-text.vue';
  import { f_win_html_get } from '@/utils/functions';
  import { c18_f_get_images } from '@/feature/18comic/apis/18ComicApis';
  const props = defineProps({
    detail: Object as PropType<Comic18Detail>,
    images: Array as PropType<ComicReader[]>,
  });
  const emits = defineEmits(['update:visible', 'update:images']);
  const contents = computed(() => props?.detail?.contents || []);
  const _images = useVModel(props, 'images', emits);
  const showDetail = async (item: Comic18Content) => {
    const html = await f_win_html_get(item.link);
    _images.value = await c18_f_get_images(html);
  };
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .c18-container {
    cursor: pointer;
    border-radius: @radius;
    &:hover {
      background-color: #333;
      color: white;
    }
    .c18-title {
      width: calc(100% - 100px);
    }
    .c18-time {
      width: 100px;
    }
  }
</style>
