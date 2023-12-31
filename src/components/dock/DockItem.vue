<template>
  <div class="container" :class="{ marginRight: showMarginRight }">
    <div class="icon">
      <img :src="image_url" alt="" />
    </div>
    <div v-if="name" class="name">{{ name }}</div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { f_requestImage } from '@/utils/functions';

  const props = defineProps({ name: String, icon: String, showMarginRight: Boolean });
  const emits = defineEmits(['click']);
  const image_url = ref();
  const init = async () => {
    image_url.value = await f_requestImage(props.icon);
  };
  init();
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: @global-secondary;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: @dock-item-hove-color;
    }
    .name {
      color: @global-text-color;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 3px;
      img {
        border-radius: 4px;
      }
    }
  }
  .marginRight {
    margin-right: 15px;
  }
</style>
