<template>
  <div h-auto w-full relative flex justify-center>
    <img ref="imagesRef" :src="imgSrc" alt="" @click="handleImgView" />
    <canvas v-show="false" ref="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { Md5 } from 'ts-md5'; //
  import type { PropType } from 'vue-demi';
  import src from '@/components/image/loading.gif?url';
  import { f_getImage } from '@/utils/business';
  import useGlobalState from '@/hooks/use-global-state';
  import useGlobalRef from '@/hooks/use-global-ref';
  const props = defineProps({
    url: String,
    extra: Object as PropType<Record<string, any>>,
  });
  const imgSrc = ref(src);
  const canvas = ref<HTMLCanvasElement>();
  const imagesRef = ref<HTMLImageElement>();
  const { webConfig } = useGlobalState();
  const { imgViewerRef } = useGlobalRef();
  const maxWidth = computed(() => webConfig.value?.comicImgMaxWidth || '80vw');
  const init = async () => {
    if (!props.url) {
      return;
    }
    imgSrc.value = await f_getImage(props.url);
    if (webConfig.value.adapterImageCode) {
      new Function(webConfig.value.adapterImageCode)()(
        imgSrc,
        props?.extra,
        Md5,
        props?.url,
        canvas
      );
    }
  };
  const handleImgView = () => {
    imgViewerRef.value.show([{ type: 'image', url: imgSrc.value, title: 'xx' }]);
  };
  onMounted(() => {
    init();
  });
</script>

<style scoped lang="less">
  img {
    max-width: v-bind(maxWidth);
  }
</style>
