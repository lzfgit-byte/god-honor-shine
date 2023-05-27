<template>
  <div class="container">
    <viewer :images="images">
      <img :src="imgSrc" :width="containerHeight" />
    </viewer>

    <canvas v-show="false" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { inject, ref, toRaw } from 'vue';
  import { Md5 } from 'ts-md5'; //   /dist/md5
  import { httpFunc, comicFunc } from '@/18-comic/utils/get18ComicFunc';
  import 'viewerjs/dist/viewer.css';
  import { component as Viewer } from 'v-viewer';

  const { getBlob } = httpFunc(inject);
  const { getImgBase64FromDisk } = comicFunc(inject);

  const props = defineProps({
    aid: String,
    scrambleId: String,
    src: String,
  });
  const images = ref();
  const containerHeight = ref('500');
  const canvas = ref();
  const imgSrc = ref();
  const showDirect = +(props?.aid || 0) < +(props?.scrambleId || 220980);
  if (showDirect) {
    //没有分割的图片
    imgSrc.value = toRaw(props?.src);
  } else {
    let url = props.src || '';
    const aid = props?.aid || '0';
    const num =
      parseInt(aid) < 268850
        ? 10
        : ((Md5.hashStr(`${props?.aid}${url.slice(url.lastIndexOf('/') + 1).split('.')[0]}`)
            .slice(-1)
            .charCodeAt(0) %
            10) +
            1) *
          2;
    getBlob(props?.src || '').then(async (res: any) => {
      // const blob = new Blob(res, { type: `image/jpg` });
      const img = new Image();
      img.src = await getImgBase64FromDisk(props.src);
      setTimeout(() => {
        const ctx = canvas?.value?.getContext('2d');
        if (!ctx) {
          return;
        }
        const w = (canvas.value.width = img.naturalWidth);
        const h = (canvas.value.height = img.naturalHeight);
        const rem = h % num;
        const sh = Math.floor(h / num);
        let sy = h - rem - sh,
          dy = rem;
        ctx.drawImage(img, 0, sy, w, rem + sh, 0, 0, w, rem + sh);
        for (let i = 1; i < num; ++i) {
          ctx.drawImage(img, 0, (sy -= sh), w, sh, 0, (dy += sh), w, sh);
        }
        imgSrc.value = canvas.value.toDataURL('image/jpeg');
        images.value = [imgSrc.value];
      }, 100);
    });
  }
  const bigger = (step = 10) => {
    containerHeight.value = +containerHeight.value + step + '';
  };
  const smaller = (step = 10) => {
    containerHeight.value = +containerHeight.value - step + '';
  };
  defineExpose({ bigger, smaller });
</script>

<style scoped lang="less">
  .container {
    overflow: hidden !important;
  }
</style>
