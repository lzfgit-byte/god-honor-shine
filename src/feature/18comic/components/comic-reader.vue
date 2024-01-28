<template>
  <ViewLayout>
    <template #action>
      <GhsButton>显示目录</GhsButton>
    </template>
    <template #body>
      <div h-full w-full relative>
        <ImgViewer
          ref="imgViewRef"
          :solve-img-comp="ComicImg"
          :reader-mode="true"
          :img-attrs="attrBind"
        ></ImgViewer>
      </div>

      <!--      <div flex flex-col items-center class="ghs-18-container" h-full w-full> -->
      <!--        <div v-for="item in images" :key="item.imgUrl" class="ghs-18-image" flex> -->
      <!--          <ComicImg :url="item.imgUrl" :aid="item.aid" :scramble-id="item.scrambleId"></ComicImg> -->
      <!--        </div> -->
      <!--      </div> -->
    </template>
  </ViewLayout>

  <GhsImgContent
    v-model:visible="visible"
    v-model:detail="detail"
    v-model:images="images"
  ></GhsImgContent>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue-demi';
  import type { Comic18Detail, ComicReader } from '@ghs/share';
  import { useRoute } from 'vue-router';

  import { computed } from 'vue';
  import { f_win_html_get } from '@/utils/functions';
  import { c18_f_get_contents } from '@/feature/18comic/apis/18ComicApis';
  import { GHSMessage } from '@/components/message';
  import ComicImg from '@/feature/18comic/components/comic-img.vue';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsButton from '@/components/button/ghs-button.vue';
  import ImgViewer from '@/components/imgViewer/img-viewer.vue';
  import type { ImgViewerExpose } from '@/components/imgViewer/type';
  import GhsImgContent from '@/feature/18comic/components/ghs-img-content.vue';
  const route = useRoute();
  const imgViewRef = ref<ImgViewerExpose>();
  const visible = ref(false);
  const detail = ref<Comic18Detail>();
  const images = ref<ComicReader[]>([]);
  const attrBind = computed(() => {
    if (images?.value?.length > 0) {
      return { aid: images.value[0].aid, scrambleId: images.value[0].scrambleId };
    }
    return {};
  });
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

  onMounted(() => {
    onInit();
  });
</script>

<style scoped lang="less">
  .ghs-18-container {
    overflow: auto;
    .ghs-18-image {
      width: 90%;
    }
  }
</style>
