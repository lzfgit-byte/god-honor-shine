<template>
  <van-button type="primary">主要按钮</van-button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Button as VanButton } from 'vant';

  const msg = ref('HelloWorld');
  const count = ref(0);
</script>
