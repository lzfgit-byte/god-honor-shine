<template>
  <div flex-inline class="ghs-s-con" items-center relative>
    <a-input
      v-model:value="value"
      class="ghs-search"
      h-full
      placeholder="请输入"
      h-4
      allow-clear
      @keydown.enter="handleEnterClick"
      @change="handleChange"
      @focus="showHistory = true"
      @blur="showHistory = false"
    />
    <transition duration="200">
      <div
        v-if="showHistory || active"
        class="historySearch"
        w-full
        absolute
        z-2
        @mouseleave="active = false"
      >
        <GhsScroller max-height="30vh">
          <div
            v-for="item in data"
            :key="item"
            p-2
            m-1
            class="search-history"
            relative
            flex
            justify-between
            items-center
            @click.stop="handlerSearch(item)"
          >
            <span> {{ item }}</span>

            <CloseCircleOutlined />
          </div>
        </GhsScroller>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  import { f_searchRecommend } from '@/utils/business';
  const emits = defineEmits(['search']);
  const value = ref('');
  const data = ref<any[]>();
  const showHistory = ref(false);

  const handleSearch = async (val: string) => {
    value.value = val;
    emits('search', val);
  };
  const handleChange = async (val: string) => {
    const strS = await f_searchRecommend(val);
    data.value = strS.map((key) => ({ value: key }));
  };
</script>

<style scoped lang="less">
  @import '@/styles/values';
  .ghs-s-con {
  }
  .ghs-search {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.4rem;
    transition: border-color 0.3s;
    outline: none;
    &:focus {
      border-color: #409eff;
    }
  }
  .historySearch {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: white;
    border-radius: @radius;
    bottom: 0;
    transform: translateY(102%);
    transition: transform 0.3s linear, opacity 0.3s linear;
    .search-history {
      cursor: pointer;
      border-radius: @radius;
      &:hover {
        background-color: #e2e3e5;
      }
    }
  }
  .clearIcon {
    position: absolute !important;
    transform: translateX(-50%);
  }

  .v-leave-from,
  .v-enter-to {
    transform: translateY(102%);
    opacity: 1;
  }
  .v-enter-from,
  .v-leave-to {
    transform: translateY(96%);
    opacity: 0;
  }
</style>
