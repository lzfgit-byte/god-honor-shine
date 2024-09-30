<template>
  <teleport to="#app">
    <div v-if="showRef" class="dialog-container">
      <div class="dialog-body">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps({ show: Boolean });
  const emit = defineEmits(['update:show']);

  const showRef = ref(false);

  watch(
    () => props.show,
    () => {
      showRef.value = props.show;
    }
  );
</script>

<style scoped lang="less">
  .dialog-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
</style>
