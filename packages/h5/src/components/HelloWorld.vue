<template>
  <div>
    {{ webConfigs }}
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Button as VanButton } from 'vant';
  import type { WebConfig } from '@ghs/types';
  import { listAllWebConfigs } from '@/api';
  const webConfigs = ref<WebConfig[]>([]);

  onMounted(async () => {
    webConfigs.value = await listAllWebConfigs();
  });
</script>
