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
        :class="{ 'c18-current': currentLink === item.link }"
        :title="item.link"
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
  import type { Comic18Detail, ComicReader, T_comic_history } from '@ghs/share';

  import type { Comic18Content } from '@ghs/share/src';
  import type { Ref } from 'vue';
  import { computed, ref } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { onMounted, watch, watchEffect } from 'vue-demi';

  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  import GhsText from '@/components/text/ghs-text.vue';
  import { f_win_html_get } from '@/utils/functions';
  import { c18_f_get_images } from '@/feature/18comic/apis/18ComicApis';
  import useComicHistory from '@/feature/18comic/hook/useComicHistory';
  const props = defineProps({
    detail: Object as PropType<Comic18Detail>,
    images: Array as PropType<ComicReader[]>,
    link: String,
    currentImg: String,
    totalImg: String,
  });
  const emits = defineEmits([
    'update:visible',
    'update:images',
    'update:currentImg',
    'update:totalImg',
  ]);
  const currentImg_ = useVModel(props, 'currentImg', emits);
  const totalImg_ = useVModel(props, 'totalImg', emits);
  const contents = computed(() => props?.detail?.contents || []);
  const _images: Ref<ComicReader[]> = useVModel(props, 'images', emits) as any;
  const { initHistory, saveOrUpdateHistory, historyData } = useComicHistory(props.link);
  const content_link = ref('');
  const currentLink = computed(() => {
    if (historyData.value) {
      return historyData.value.content_link;
    }
    if (props?.detail?.contents && props?.detail?.contents.length > 0) {
      return contents.value[0].link;
    }
    return content_link.value;
  });
  const showDetail = async (item: Comic18Content) => {
    const html = await f_win_html_get(item.link);
    _images.value = await c18_f_get_images(html);
    content_link.value = item.link;
    await saveOrUpdateHistory({
      id: historyData.value.id,
      comic_link: props.link,
      content_link: item.link,
      current_page: `${+currentImg_.value + 1}`,
      total_page: `${totalImg_.value}`,
    });
    await initHistory();
  };

  const initDetail = async (item: T_comic_history) => {
    if (!item?.content_link) {
      return;
    }
    const html = await f_win_html_get(item.content_link);
    _images.value = await c18_f_get_images(html);
    currentImg_.value = `${+item.current_page - 1}`;
    await saveOrUpdateHistory({
      id: historyData.value?.id,
      comic_link: props.link,
      content_link: item.content_link,
      current_page: `${+currentImg_.value + 1}`,
      total_page: `${totalImg_.value}`,
    });
  };
  watchEffect(() => {
    if (content_link.value && currentImg_.value !== null && totalImg_.value) {
      saveOrUpdateHistory({
        id: historyData?.value?.id,
        comic_link: props.link,
        content_link: content_link.value,
        current_page: `${+currentImg_.value + 1}`,
        total_page: `${totalImg_.value}`,
      });
    }
    if (currentLink.value && _images.value?.length === 0 && !historyData.value) {
      initDetail({ content_link: currentLink.value });
    }
  });

  onMounted(() => {
    initHistory(initDetail);
  });
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .c18-container {
    cursor: pointer;
    border-radius: @radius;
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 8px;
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
  .c18-current {
    background-color: #333;
    color: white;
  }
</style>
