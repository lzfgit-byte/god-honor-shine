<template>
  <div class="ghs-item-container" relative inline-flex flex-col justify-start items-center>
    <div v-if="$props?.onCloseClick" absolute class="ghs-delete-icon" @click="handleCloseClick">
      <CloseCircleOutlined />
    </div>
    <div class="ghs-item-coverImg" w-full relative>
      <GhsImg
        cursor-pointer
        :max-height="maxHeight"
        :max-width="maxWidth"
        :url="item.coverImg"
        @click="handleImgClick"
      />
      <div v-if="!hideTag" absolute top-2 right-1 flex justify-end items-center gap-1>
        <GhsTag v-for="(item_, index) in item.tags" :key="index" :info="item_"></GhsTag>
      </div>
    </div>
    <div v-if="item.title" class="ghs-item-title" w-full flex justify-start items-center>
      <GhsText :value="item.title" />
      <StarOutlined />
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { PropType } from 'vue-demi';
  import { toRaw } from 'vue-demi';
  import { CloseCircleOutlined, StarOutlined } from '@ant-design/icons-vue';
  import { computed } from 'vue';

  import type { Item } from '@ghs/types';
  import GhsImg from '@/components/image/ghs-img.vue';
  import GhsText from '@/components/text/ghs-text.vue';

  const props = defineProps({
    width: String,
    height: String,
    onCloseClick: Function,
    hideTag: Boolean,
    maxHeight: String,
    maxWidth: String,
    item: Object as PropType<Item>,
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
