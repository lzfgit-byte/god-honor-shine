<template>
  <teleport to="#app">
    <transition
      :duration="300"
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div
        v-show="visible && images.length > 0"
        class="ghsiv-con"
        h-full
        w-full
        z-9996
        absolute
        left-0
        top-0
        @contextmenu="visible = false"
      >
        <div class="ghsiv-header" absolute flex items-center w-full left-0 top-0 z-9998>
          <div class="ghsiv-left" flex justify-start items-center p-l-4 h-full gap-10px>
            <span>{{ showCurrent }} / {{ images.length }}</span>
            <GhsButton type="text" @click="choseUrl = 'fullUrl'">缩略</GhsButton>
            <GhsButton type="text" @click="choseUrl = 'minUrl'">全图</GhsButton>
          </div>
          <div class="ghsiv-title" flex justify-center items-center p-l-4 h-full>
            {{ images.length > 0 && images[current]?.title }}
          </div>
          <div class="ghsiv-extra" flex items-center justify-end p-r-4 h-full>
            <GhsIcon cursor-pointer @click="visible = false"><Close></Close></GhsIcon>
          </div>
        </div>
        <div
          ref="bodyRef"
          class="ghsiv-body"
          absolute
          h-full
          w-full
          flex
          justify-center
          items-center
          top-0
          left-0
          z-9997
        >
          <div ref="imgContainerRef" class="img-container" h-auto w-auto>
            <transition enter-active-class="animate__animated animate__zoomIn">
              <GhsImg2
                :key="imgUrl"
                class="img-img"
                :url="imgUrl"
                :force="force"
                @contextmenu.stop="nextImg"
              ></GhsImg2>
            </transition>
          </div>

          <div class="ghsiv-dir" absolute left-4 flex justify-center items-center z-9999>
            <GhsIcon cursor-pointer width="30px" height="30px" @click="preImg">
              <ArrowBackCircleOutline />
            </GhsIcon>
          </div>
          <div class="ghsiv-dir" absolute right-4 flex justify-center items-center z-9999>
            <GhsIcon width="30px" height="30px" cursor-pointer @click="nextImg">
              <ArrowForwardCircleOutline />
            </GhsIcon>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
  import type { HWImgInfo } from '@ghs/share';
  import { ArrowBackCircleOutline, ArrowForwardCircleOutline, Close } from '@vicons/ionicons5';
  import GhsImg2 from '@/components/image/ghs-img2.vue';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import useImgViewer from '@/components/imgViewer/hooks/useImgViewer';
  import useImgShow from '@/components/imgViewer/hooks/useImgShow';
  import GhsButton from '@/components/button/ghs-button.vue';
  defineProps({ force: Boolean });
  const {
    bodyRef,
    imgContainerRef,
    scaleComp,
    translateXComp,
    translateYComp,
    translateX,
    translateY,
  } = useImgViewer();
  // 业务
  const { showCurrent, visible, imgUrl, preImg, nextImg, images, choseUrl, current } = useImgShow(
    translateX,
    translateY
  );
  defineExpose({
    show: (ims: HWImgInfo[]) => {
      translateX.value = 0;
      translateY.value = 0;
      current.value = 0;
      choseUrl.value = 'minUrl';
      images.value = ims;
      visible.value = true;
    },
    close: () => {
      visible.value = false;
    },
  });
</script>

<style scoped lang="less">
  @titleWidth: 70%;
  @extraWidth: 15%;
  .ghsiv-con {
    background: rgba(0, 0, 0, 0.54);
    .ghsiv-header {
      background: rgba(0, 0, 0, 0.72);
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
        transition: all 0.1s linear;
        transform: v-bind(translateXComp) v-bind(translateYComp) v-bind(scaleComp);
        box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
      }
    }
  }
</style>
