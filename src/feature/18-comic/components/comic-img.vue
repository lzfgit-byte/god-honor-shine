<template>
  <div class="container">
    <Viewer :images="images">
      <img :src="imgSrc" :width="containerHeight" />
    </Viewer>

    <canvas v-show="false" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRaw } from 'vue';
  import { Md5 } from 'ts-md5'; //   /dist/md5
  import 'viewerjs/dist/viewer.css';
  import { component as Viewer } from 'v-viewer';
  import { getImgUrl } from '@/utils/kit-utils';

  const props = defineProps({
    aid: String,
    scrambleId: String,
    src: String,
  });
  const get_num = (e, t) => {
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
  const images = ref();
  const containerHeight = ref('500');
  const canvas = ref();
  const imgSrc = ref();
  const showDirect = +(props?.aid || 0) < +(props?.scrambleId || 220980);
  if (showDirect) {
    // 没有分割的图片
    imgSrc.value = toRaw(props?.src);
  } else {
    let url = props.src || '';
    const aid = props?.aid || '0';
    const cur = url.substring(url.indexOf(aid) + aid.length + 1, url.indexOf('.webp'));
    const num = get_num(aid, cur);
    const img = new Image();
    img.src = getImgUrl(props.src as string);
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
      images.value = [imgSrc.value];
    };
  }
  const bigger = (step = 10) => {
    containerHeight.value = `${+containerHeight.value + step}`;
  };
  const smaller = (step = 10) => {
    containerHeight.value = `${+containerHeight.value - step}`;
  };
  defineExpose({ bigger, smaller });
</script>

<style scoped lang="less">
  .container {
    overflow: hidden !important;
  }
</style>
