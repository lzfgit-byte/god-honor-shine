<template>
  <el-dropdown trigger="click">
    <el-icon :size="25"><Menu /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in renderRoutes" :key="item.path" @click="handlerClick(item)">
          {{ item.aliasZH }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
  import { Menu } from '@element-plus/icons-vue';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import type { routerType } from '@/router/router';
  import { routes } from '@/router/router';
  const renderRoutes = computed(() => routes.filter((item) => item.showInMenu));
  const router = useRouter();
  const handlerClick = (item: routerType) => {
    router.push({ path: item.path });
  };
</script>

<style scoped lang="less"></style>
