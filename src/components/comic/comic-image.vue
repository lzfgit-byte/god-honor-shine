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
  const staticCode = `
    return (
    imgSrc,
  extra,
  Md5,
  url,
  canvas
) => {
  $code;
};
  `;
  const code = `
    const get_num = (e, t) => {
  let a = 10;
  let n = e+t;
  switch (
    ((n = (n = (n = Md5.hashStr(n)).substr(-1)).charCodeAt(0)),
    e >= 268850 && e <= 421925 ? (n %= 10) : e >= 421926 && (n %= 8),
    n)
  ) {
    case 0:
      a = 2;
      break;
    case 1:
      a = 4;
      break;
    case 2:
      a = 6;
      break;
    case 3:
      a = 8;
      break;
    case 4:
      a = 10;
      break;
    case 5:
      a = 12;
      break;
    case 6:
      a = 14;
      break;
    case 7:
      a = 16;
      break;
    case 8:
      a = 18;
      break;
    case 9:
      a = 20;
  }
  return a;
};
const showDirect = +(extra?.aid || 0) < +(extra?.scrambleId || 220980);
if (!showDirect) {
  const aid = extra?.aid || '0';
  const cur = url.substring(url.indexOf(aid) + aid.length + 1, url.indexOf('.webp'));
  const num = get_num(aid, cur);
  const img = new Image();
  img.src = imgBase64;

  img.onload = () => {
    const ctx = canvas?.value?.getContext('2d');
    if (!ctx) {
      return;
    }
    const w = (canvas.value.width = img.naturalWidth);
    const h = (canvas.value.height = img.naturalHeight);
    const rem = h % num;
    const sh = Math.floor(h / num);
    let sy = h - rem - sh;
    let dy = rem;
    ctx.drawImage(img, 0, sy, w, rem + sh, 0, 0, w, rem + sh);
    for (let i = 1; i < num; ++i) {
      ctx.drawImage(img, 0, (sy -= sh), w, sh, 0, (dy += sh), w, sh);
    }
    imgSrc.value =  canvas.value.toDataURL('image/jpeg');
  };
}
  `;
  const init = async () => {
    if (!props.url) {
      return;
    }
    imgSrc.value = await f_getImage(props.url);
    new Function(staticCode.replace('$code', code))()(
      imgSrc,
      props?.extra,
      Md5,
      props?.url,
      canvas
    );
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
