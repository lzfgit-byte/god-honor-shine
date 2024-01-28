<template>
  <div flex flex-col items-center class="ghs-18-container" h-full w-full>
    <div v-for="item in images" :key="item.imgUrl" class="ghs-18-image" flex>
      <ComicImg :url="item.imgUrl" :aid="item.aid" :scramble-id="item.scrambleId"></ComicImg>
    </div>
  </div>
  <GhsDialog
    v-model:visible="visible"
    title="目录"
    :destroy-on-close="true"
    top="5%"
    :mask-closed="true"
  >
    <div flex flex-col>
      <div w-full flex m-b-2>
        <GhsText :value="detail.detail" />
      </div>
      <GhsScroller max-height="80vh">
        <div
          v-for="item in detail.contents"
          :key="item.link"
          w-full
          flex-inline
          justify-between
          items-center
          p-2
          class="c18-container"
          @click="showDetail(item)"
        >
          <div class="c18-title" flex-inline><GhsText :value="item.title" /></div>
          <div class="c18-time" flex justify-end>{{ item.time }}</div>
        </div>
      </GhsScroller>
    </div>
  </GhsDialog>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue-demi';
  import type { Comic18Detail, ComicReader } from '@ghs/share';
  import { useRoute } from 'vue-router';

  import type { Comic18Content } from '@ghs/share/src';
  import { computed } from 'vue';
  import { f_win_html_get } from '@/utils/functions';
  import { c18_f_get_contents, c18_f_get_images } from '@/feature/18comic/apis/18ComicApis';
  import { GHSMessage } from '@/components/message';
  import GhsDialog from '@/components/dialog/ghs-dialog.vue';
  import GhsText from '@/components/text/ghs-text.vue';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  import ComicImg from '@/feature/18comic/components/comic-img.vue';
  const route = useRoute();

  const visible = ref(false);
  const detail = ref<Comic18Detail>();
  const content = computed(() => detail.value.contents);
  const onInit = async () => {
    const link: string = route.query.link as any;

    if (link) {
      const html = await f_win_html_get(link);
      detail.value = await c18_f_get_contents(html);
      visible.value = true;
    } else {
      await GHSMessage.info('link 为空');
    }
  };
  const images = ref<ComicReader[]>();
  const showDetail = async (item: Comic18Content) => {
    const html = await f_win_html_get(item.link);
    images.value = await c18_f_get_images(html);
    console.log(images.value);
  };
  onMounted(() => {
    onInit();
  });
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .c18-container {
    cursor: pointer;
    border-radius: @radius;
    &:hover {
      background-color: white;
      color: black;
    }
    .c18-title {
      width: calc(100% - 100px);
    }
    .c18-time {
      width: 100px;
    }
  }
  .ghs-18-container {
    overflow: auto;
    .ghs-18-image {
      width: 90%;
    }
  }
</style>
