<template>
  <div h-full w-full relative>
    <div h-full w-full relative flex justify-center items-center class="img-container">
      <img ref="imagesRef" h-full w-full :src="imgSrc" alt="" />
    </div>
    <canvas v-show="false" ref="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Md5 } from 'ts-md5'; //
  import type { PropType } from 'vue-demi';
  import src from '@/components/image/loading.gif?url';
  import { f_getImage } from '@/utils/business';
  import useGlobalState from '@/hooks/use-global-state';
  const props = defineProps({
    url: String,
    extra: Object as PropType<Record<string, any>>,
  });
  const imgSrc = ref(src);
  const canvas = ref<HTMLCanvasElement>();
  const imagesRef = ref();
  const { webConfig } = useGlobalState();

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
  init();
</script>

<style scoped lang="less">
  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    cursor: grab;
    &:active {
      cursor: grabbing !important;
    }
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
