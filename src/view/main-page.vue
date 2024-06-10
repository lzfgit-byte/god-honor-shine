<template>
  <ViewLayout></ViewLayout>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import ViewLayout from '@/components/layout/view-layout.vue';
  const route = useRoute();
  const webKey = route.query.key;

  onMounted(() => {
    console.log(webKey);
  });
</script>

<style scoped lang="less"></style>
