<template>
  <teleport to="#app">
    <transition enter-active-class="animate__animated animate__bounceIn">
      <div v-show="fullSize" absolute flex justify-center items-center class="ghs-menu-container">
        <div
          v-for="(item, index) in culRoutes"
          :key="index"
          class="ghs-menu-item"
          flex
          justify-center
          items-center
          @click="handleClick(item)"
        >
          <div class="ghs-menu-icon" m-r-1>
            <GhsImg :url="item.icon"></GhsImg>
          </div>
          <div class="ghs-title">{{ item.aliasZH }}</div>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animate__animated animate__bounceIn">
      <div v-show="!fullSize" absolute class="ghs-menu-mimiSize" @click="fullSize = true"></div>
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
  const culRoutes = computed(() => routes.filter((i) => i.icon));
  const fullSize = ref(false);
  const handleClick = (item) => {
    router.push(item.path);
  };
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .ghs-menu-container {
    padding: 3px 5px;
    background-color: #333;
    border-radius: @radius;
    bottom: 1%;
    right: 0;
    left: 0;
    margin: auto;
    width: max-content;
    .ghs-menu-item {
      padding: 5px 10px;
      margin: 3px;
      cursor: pointer;
      border-radius: @radius;
      &:hover {
        background-color: #484747;
      }
    }
  }
  .ghs-menu-mimiSize {
    bottom: 3px;
    padding: 5px 10px;
    background-color: #333;
    border-radius: @radius;
    cursor: pointer;
    right: 0;
    left: 0;
    margin: auto;
    width: max-content;
  }
</style>
