<template>
  <teleport to="#app">
    <div absolute bottom-0 flex justify-center items-center class="ghs-menu-container">
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
  </teleport>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import { routes } from '@/router/router';
  import GhsImg from '@/components/image/ghs-img.vue';
  let router = useRouter();
  const culRoutes = computed(() => routes.filter((i) => i.icon));
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
    left: 50%;
    transform: translateX(-50%);
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
</style>
