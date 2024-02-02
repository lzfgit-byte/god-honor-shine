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
  import src from '@/components/image/loading.gif?url';
  import { f_request_img_get, f_win_img_get } from '@/utils/functions';

  const props = defineProps({
    url: String,
    force: Boolean,
    aid: String,
    scrambleId: String,
  });
  const imgSrc = ref(src);
  const canvas = ref<HTMLCanvasElement>();
  const imagesRef = ref();
  const get_num = (e: any, t: any) => {
    let a = 10;
    let n: any = `${e}${t}`;
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
  const loadImg = async () => {
    if (props.force) {
      debugger;
      imgSrc.value = await f_win_img_get(props.url);
    } else {
      imgSrc.value = await f_request_img_get(props.url);
    }
  };
  const init = async () => {
    if (!props.url) {
      return;
    }
    await loadImg();
    const showDirect = +(props?.aid || 0) < +(props?.scrambleId || 220980);
    if (!showDirect) {
      let url = props.url || '';
      const aid = props?.aid || '0';
      const cur = url.substring(url.indexOf(aid) + aid.length + 1, url.indexOf('.webp'));
      const num = get_num(aid, cur);
      const img = new Image();
      img.src = imgSrc.value;

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
        imgSrc.value = canvas.value.toDataURL('image/jpeg');
      };
    }
  };
  init();
</script>

<style scoped lang="less">
  @import '@/styles/values';
  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    border-radius: @radius;
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
