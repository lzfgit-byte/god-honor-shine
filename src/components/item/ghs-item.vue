<template>
  <div class="ghs-item-container" relative inline-flex flex-col justify-start items-center>
    <div class="ghs-item-coverImg" w-full relative cursor-pointer>
      <GhsImg :url="coverImg" :force="force" />
    </div>
    <div v-if="title" class="ghs-item-title" w-full flex justify-start items-center>
      <GhsText :value="title" />
    </div>
    <div v-if="author" class="ghs-item-author" w-full flex justify-start items-center>
      {{ author }}
    </div>
    <div v-if="tags" class="ghs-item-tags" w-full relative flex justify-start items-center>
      {{ tags.map((i) => i.title).join(' ') }}
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { PageTags } from '@ghs/share';
  import { computed } from 'vue';
  import GhsImg from '@/components/image/ghs-img.vue';
  import GhsText from '@/components/text/ghs-text.vue';

  const props = defineProps({
    jumpUrl: String,
    coverImg: String,
    title: String,
    author: String,
    tags: Array as PropType<PageTags[]>,
    flatTags: Array as PropType<PageTags[]>,
    width: String,
    height: String,
    force: Boolean,
  });
  const c_width = computed(() => props.width || '250px');
  const imgHeight = computed(() => props.height || '200px');
</script>

<style scoped lang="less">
  @infoPadding: 5px 0 0 0px;
  .ghs-item-container {
    padding: 0 10px 10px 0;
    border-radius: 8px;
    width: v-bind(c_width);
    .ghs-item-coverImg {
      height: v-bind(imgHeight);
    }
    .ghs-item-title {
      padding: @infoPadding;
    }
    .ghs-item-author {
      padding: @infoPadding;
    }
    .ghs-item-tags {
      padding: @infoPadding;
    }
  }
</style>
