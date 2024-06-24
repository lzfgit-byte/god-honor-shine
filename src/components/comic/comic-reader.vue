<template>
  <div h-full w-full></div>
</template>
<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted } from 'vue';

  const route = useRoute();
  const router = useRouter();
  onMounted(() => {
    console.log(route.params);
  });
</script>

<style scoped lang="less"></style>
