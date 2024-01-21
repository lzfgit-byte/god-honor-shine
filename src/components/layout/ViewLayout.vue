<template>
  <div class="view-container" h-full w-full relative>
    <div class="view-action" w-full>
      <slot name="action"></slot>
    </div>
    <div class="view-body" w-full>
      <slot name="body"></slot>
    </div>
    <div class="" w-5vw z-99 h-full absolute right-0 top-0 @mouseenter="handleMouseEnter"></div>
    <div
      class="view-slide-container"
      z-2
      :class="{ slideShow }"
      h-full
      w-full
      absolute
      left-0
      top-0
    >
      <div
        class="view-slide"
        :class="{ slideShowSlide: slideShow, hideSlide: !slideShow }"
        h-full
        absolute
        top-0
        @mouseout="handleMouseOut"
      >
        <slot name="slide"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const slideShow = ref(false);
  const handleMouseEnter = () => {
    slideShow.value = true;
  };
  const handleMouseOut = () => {
    slideShow.value = false;
  };
</script>

<style scoped lang="less">
  @height: 10%;
  @slideWidth: 50vw;
  @keyframes slideIn {
    0% {
    }
    100% {
      right: 0;
    }
  }
  @keyframes slideOut {
    0% {
      right: 0;
    }
    100% {
      right: 0 - @slideWidth;
    }
  }
  .view-action {
    height: @height;
  }
  .view-body {
    height: calc(100% - @height);
  }
  .view-slide-container {
    .view-slide {
      width: @slideWidth;
      transition: right 0.5s linear;
      right: 0 - @slideWidth;
      background-color: #fff;
      border-radius: 8px;
    }
    .slideShowSlide {
      animation: slideIn 0.5s ease-in-out forwards;
    }
    .hideSlide {
      animation: slideOut 0.5s ease-in-out forwards !important;
    }
  }
  .slideShow {
    background-color: rgba(0, 0, 0, 0.22);
  }
</style>
