<template>
  <teleport to="#app">
    <div class="ghsiv-con" h-full w-full z-9996 absolute left-0 top-0>
      <div class="ghsiv-header" absolute flex items-center w-full left-0 top-0 z-9998>
        <div class="ghsiv-left" flex justify-start items-center p-l-4 h-full>1 / 4</div>
        <div class="ghsiv-title" flex justify-center items-center p-l-4 h-full> xxxxxxxx </div>
        <div class="ghsiv-extra" flex items-center justify-end p-r-4 h-full>x</div>
      </div>
      <div ref="bodyRef" class="ghsiv-body" absolute h-full w-full top-0 left-0 z-9997>
        <div
          ref="imgContainerRef"
          class="img-container"
          h-auto
          w-auto
          absolute
          top-0
          flex
          items-center
          justify-center
        >
          <GhsImg2
            url="https://pic1.zhimg.com/70/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.avis?source=172ae18b&biz_tag=Post"
          ></GhsImg2>
        </div>
        <div class="ghsiv-dir ghsiv-left" absolute left-4 flex justify-center items-center>
          {{ '<' }}
        </div>
        <div class="ghsiv-dir ghsiv-right" absolute right-4 flex justify-center items-center>
          {{ '>' }}
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue';
  import { ref, watchEffect } from 'vue-demi';
  import { computed, onMounted } from 'vue';
  import { useElementSize } from '@vueuse/core';
  import type { HWImgInfo } from '@ghs/share';
  import GhsImg2 from '@/components/image/ghs-img2.vue';

  const props = defineProps({ images: Array as PropType<HWImgInfo[]> });
  const bodyRef = ref<HTMLDivElement>();
  const imgContainerRef = ref<HTMLDivElement>();
  const scale = ref(100);
  const scaleComp = computed(() => `scale(${scale.value}%)`);

  const translateX = ref(0);
  const translateXComp = computed(() => `translateX(${translateX.value}px)`);

  const translateY = ref(0);
  const translateYComp = computed(() => `translateY(${translateY.value}px)`);

  const { width, height } = useElementSize(bodyRef);
  const { width: imgWidth, height: imgHeight } = useElementSize(imgContainerRef);
  const isMove = ref(false);
  watchEffect(() => {
    translateX.value = (width.value - imgWidth.value) / 2;
    translateY.value = (height.value - imgHeight.value) / 2;
  });
  onMounted(() => {
    bodyRef.value.addEventListener('wheel', (evt) => {
      const step = 10;
      if (evt.deltaY > 0) {
        scale.value -= step;
        if (scale.value < 10) {
          scale.value = 10;
        }
      } else {
        scale.value += step;
      }
    });
    let oldPos = [];

    imgContainerRef.value.addEventListener('mousedown', (evt) => {
      isMove.value = true;
      oldPos = [evt.pageX, evt.pageY];
    });
    imgContainerRef.value.addEventListener('mouseup', (evt) => {
      isMove.value = false;
    });

    imgContainerRef.value.addEventListener('mousemove', (evt) => {
      if (isMove.value) {
        translateX.value += evt.pageX - oldPos[0];
        translateY.value += evt.pageY - oldPos[1];
        oldPos = [evt.pageX, evt.pageY];
      }
    });
    imgContainerRef.value.addEventListener('mouseleave', (evt) => {
      isMove.value = false;
    });
  });
</script>

<style scoped lang="less">
  @titleWidth: 70%;
  @extraWidth: 15%;
  .ghsiv-con {
    background: rgba(0, 0, 0, 0.3);
    .ghsiv-header {
      background: rgba(0, 0, 0, 0.56);
      color: #bdb5b5;
      height: 40px;
      .ghsiv-left {
        width: @extraWidth;
      }
      .ghsiv-title {
        width: @titleWidth;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ghsiv-extra {
        width: @extraWidth;
      }
    }
    .ghsiv-body {
      .ghsiv-dir {
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      .img-container {
        transition: transform 0.1s linear;
        transform: v-bind(translateXComp) v-bind(translateYComp) v-bind(scaleComp);
      }
    }
  }
</style>
