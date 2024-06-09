<template>
  <teleport to="#app">
    <transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div
        v-show="fullSize"
        absolute
        flex
        justify-center
        items-center
        class="ghs-menu-container"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousemove="onMouseEnter"
      >
        <div
          v-for="(item, index) in culRoutes"
          :key="index"
          class="ghs-menu-item"
          flex
          justify-center
          items-center
          @click="handleClick(item)"
          @mouseenter="onMouseEnter"
        >
          <div class="ghs-menu-icon" m-r-1 w-4 h-4>
            <GhsImg :url="item.icon" :force="item.force"></GhsImg>
          </div>
          <div class="ghs-title">{{ item.aliasZH }}</div>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div v-show="!fullSize" absolute class="ghs-menu-mimiSize" @mouseenter="handleMinClick"></div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import { ref } from 'vue-demi';
  import { routes } from '@/router/router';
  import GhsImg from '@/components/image/ghs-img.vue';
  let router = useRouter();
  const culRoutes = computed(() => routes.value.filter((i) => i.icon));
  const fullSize = ref(false);
  const handleClick = (item) => {
    router.push(item.path);
  };
  let timer: any;
  const setTimer = () => {
    timer = setTimeout(() => {
      fullSize.value = false;
    }, 1500);
  };
  const handleMinClick = () => {
    fullSize.value = true;
    setTimer();
  };
  const onMouseEnter = () => {
    timer && clearTimeout(timer);
    timer = null;
  };
  const onMouseLeave = () => {
    setTimer();
  };
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .ghs-menu-container {
    padding: 3px 5px;
    background-color: #333;
    border-radius: @radius;
    bottom: 10px;
    right: 0;
    left: 0;
    margin: auto;
    width: max-content;
    z-index: 9999;
    .ghs-menu-item {
      padding: 5px 10px;
      margin: 3px;
      cursor: pointer;
      border-radius: @radius;
      color: white;
      &:hover {
        background-color: #484747;
      }
    }
  }
  .ghs-menu-mimiSize {
    bottom: 3px;
    padding: 6px 40px;
    background-color: #333;
    border-radius: @radius;
    cursor: pointer;
    right: 0;
    left: 0;
    margin: auto;
    width: max-content;
    z-index: 9999;
  }
</style>
