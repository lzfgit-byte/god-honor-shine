<template>
  <div class="ghs-item-container" relative inline-flex flex-col justify-start items-center>
    <div v-if="$props?.onCloseClick" absolute class="ghs-delete-icon" @click="handleCloseClick">
      <GhsIcon width="20px" height="20px" color="#9f9898"><CloseCircleOutline /></GhsIcon>
    </div>
    <div class="ghs-item-coverImg" w-full relative>
      <GhsImg cursor-pointer :url="coverImg" :force="force" @click="handleImgClick" />
      <div v-if="!hideTag" absolute top-2 right-1 flex justify-end items-center gap-1>
        <GhsTag v-for="(item, index) in flatTags" :key="index" :info="item"></GhsTag>
      </div>
    </div>
    <div v-if="title" class="ghs-item-title" w-full flex justify-start items-center>
      <GhsText :value="title" />
      <GhsIcon v-if="$props?.onTriggerCollect" absolute title="收藏" @click="handleCollect">
        <StarOutline />
      </GhsIcon>
    </div>
    <div v-if="author" class="ghs-item-author" w-full flex justify-start items-center>
      <GhsText :value="author" />
    </div>
    <div v-if="tags" class="ghs-item-tags" w-full relative flex justify-start items-center>
      <GhsText :value="tags.map((i) => i.title).join(' ')" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import type { PageTags } from '@ghs/share';
  import { computed } from 'vue';
  import { CloseCircleOutline, StarOutline } from '@vicons/ionicons5';
  import { toRaw } from 'vue-demi';
  import GhsImg from '@/components/image/ghs-img.vue';
  import GhsText from '@/components/text/ghs-text.vue';
  import GhsTag from '@/components/tag/ghs-tag.vue';
  import GhsIcon from '@/components/icon/ghs-icon.vue';

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
    onTriggerCollect: Function,
    onCloseClick: Function,
    hideTag: Boolean,
  });
  const emits = defineEmits(['imgClick', 'triggerCollect', 'closeClick']);
  const c_width = computed(() => props.width || '250px');
  const imgHeight = computed(() => props.height || '200px');
  const handleImgClick = () => {
    emits('imgClick');
  };
  const handleCollect = () => {
    emits('triggerCollect', toRaw(props));
  };
  const handleCloseClick = () => {
    emits('closeClick');
  };
</script>

<style scoped lang="less">
  @import '@/styles/values';
  @infoPadding: 5px 0 0 0px;
  .ghs-item-container {
    padding: 0 5px 1px 5px;
    margin: 0 5px 5px 5px;
    border-radius: @radius;
    width: v-bind(c_width);
    box-shadow: rgba(67, 71, 85, 0.27) 0 0 0.25em, rgba(90, 125, 188, 0.05) 0 0.25em 1em;
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
  .ghs-delete-icon {
    width: 15px;
    height: 15px;
    right: -2%;
    top: -4%;
    z-index: 3;
  }
</style>
