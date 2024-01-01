<template>
  <div class="item-container">
    <div class="tag-container">
      <TagItem> </TagItem>
    </div>
    <div class="item-image" @click="handleImgClick">
      <ImageItem src="https://cdn.beekka.com/blogimg/asset/202312/bg2023122614.webp"></ImageItem>
    </div>
    <div class="item-title" :title="title">
      <span>这是标题</span>
    </div>
    <div class="tag-container2">
      <TagItem> </TagItem>
    </div>
  </div>
</template>
<script setup lang="ts">
  import ImageItem from '@/components/image/image-item.vue';
  import TagItem from '@/components/card/tag-item.vue';
  const props = defineProps({ imgSrc: String, title: String });
  const emits = defineEmits(['click']);
  const handleImgClick = () => {
    emits('click');
  };
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .item-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    .tag-container {
      position: absolute;
      width: 100%;
      left: 5px;
      top: 5px;
      overflow-y: auto;
    }
    .tag-container2 {
      position: absolute;
      bottom: 30px;
      display: flex;
      justify-content: flex-end;
      right: 5px;
    }
    .item-image {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .item-title {
      padding: 5px 0 0 0;
      span {
        color: @global-text-color;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
