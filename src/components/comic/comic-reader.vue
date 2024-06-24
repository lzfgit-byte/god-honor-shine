<template>
  <div ref="containerRef" h-full w-full></div>
  <a-float-button>
    <template #icon>
      <RollbackOutlined />
    </template>
  </a-float-button>
</template>
<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  import { RollbackOutlined } from '@ant-design/icons-vue';
  import useComicState from '@/components/comic/hooks/useComicState';

  const route = useRoute();
  const router = useRouter();
  const { containerRef } = useComicState(route?.query?.url as string);
  onMounted(() => {
    console.log(route.query);
  });
</script>

<style scoped lang="less"></style>
