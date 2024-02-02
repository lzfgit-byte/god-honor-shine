<template>
  <ViewLayout :init-slide-show="true">
    <template #action>
      <GhsButton @click="router.back()">返回</GhsButton>
    </template>
    <template #body>
      <GhsScroller max-height="85vh">
        <div w-full flex flex-col items-center>
          <div v-for="item in images" :key="item.imgUrl" class="comic-img-container">
            <ComicImg
              :url="item.imgUrl"
              :aid="item.aid"
              :scramble-id="item.scrambleId"
              :force="true"
            ></ComicImg>
          </div>
        </div>
      </GhsScroller>

      <!--        <ImgViewer -->
      <!--          ref="imgViewRef" -->
      <!--          v-model:current-img="currentImg_" -->
      <!--          v-model:total-img="totalImg_" -->
      <!--          :solve-img-comp="ComicImg" -->
      <!--          :reader-mode="true" -->
      <!--          :images-arr="imagesArr" -->
      <!--          :img-attrs="attrBind" -->
      <!--        ></ImgViewer> -->
    </template>
    <template #slide>
      <GhsImgContent
        v-model:detail="detail"
        v-model:images="images"
        v-model:total-img="totalImg_"
        v-model:current-img="currentImg_"
        :link="link"
      ></GhsImgContent>
    </template>
  </ViewLayout>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue-demi';
  import type { Comic18Detail, ComicReader, HWImgInfo } from '@ghs/share';
  import { useRoute, useRouter } from 'vue-router';
  import { computed } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { f_win_html_get } from '@/utils/functions';
  import { c18_f_get_contents } from '@/feature/18comic/apis/18ComicApis';
  import { GHSMessage } from '@/components/message';
  import ComicImg from '@/feature/18comic/components/comic-img.vue';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsButton from '@/components/button/ghs-button.vue';
  import ImgViewer from '@/components/imgViewer/img-viewer.vue';
  import type { ImgViewerExpose } from '@/components/imgViewer/type';
  import GhsImgContent from '@/feature/18comic/components/ghs-img-content.vue';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  const route = useRoute();
  const router = useRouter();
  const imgViewRef = ref<ImgViewerExpose>();
  const detail = ref<Comic18Detail>();
  const images = ref<ComicReader[]>([]);
  const imagesArr = computed<HWImgInfo[]>(() =>
    images?.value?.map((img) => ({ minUrl: img.imgUrl, fullUrl: img.imgUrl }))
  );
  const attrBind = computed(() => {
    if (images?.value?.length > 0) {
      return { aid: images.value[0].aid, scrambleId: images.value[0].scrambleId };
    }
    return {};
  });
  const currentImg_ = ref();
  const totalImg_ = ref();
  const link: string = route.query.link as any;
  const onInit = async () => {
    if (link) {
      const html = await f_win_html_get(link);
      detail.value = await c18_f_get_contents(html);
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
  .comic-img-container {
    width: 60%;
    height: auto;
  }
</style>
