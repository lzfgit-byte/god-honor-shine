<template>
  <div flex-inline class="ghs-s-con" items-center relative>
    <input
      ref="inputRef"
      v-model="value"
      class="ghs-search"
      h-full
      placeholder="请输入"
      h-4
      @keydown.enter="handleEnterClick"
      @focus="handleFocus"
      @blur="showHistory = false"
    />
    <GhsIcon v-show="value?.length > 0" absolute right-0 class="clearIcon" @click="handlerClear">
      <Close />
    </GhsIcon>
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
            v-for="item in historyData"
            :key="item"
            p-2
            m-1
            class="search-history"
            relative
            flex
            justify-between
            items-center
            @click="handlerSearch(item)"
          >
            <span> {{ item }}</span>

            <GhsIcon
              height="15px"
              width="15px"
              absolute
              @mouseenter="active = true"
              @click.stop="handlerDelete(item)"
            >
              <Close />
            </GhsIcon>
          </div>
        </GhsScroller>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Close } from '@vicons/ionicons5';
  import GhsIcon from '@/components/icon/ghs-icon.vue';
  import GhsScroller from '@/components/scroller/ghs-scroller.vue';
  defineProps({ historyData: Array });
  const emits = defineEmits(['search', 'reset', 'deleteSearch']);
  const value = ref('');
  const inputRef = ref<HTMLInputElement>();
  const showHistory = ref(false);
  const active = ref(false);
  const handleFocus = () => {
    showHistory.value = true;
  };
  const handleEnterClick = () => {
    showHistory.value = false;
    active.value = false;
    inputRef.value.blur();
    if (value.value === '') {
      emits('reset');
      return;
    }
    emits('search', value.value);
  };
  const handlerSearch = (item) => {
    emits('search', item);
    active.value = false;
    value.value = item;
  };
  const handlerClear = () => {
    value.value = '';
  };
  const handlerDelete = (item) => {
    active.value = true;
    emits('deleteSearch', item);
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
    pointer-events: none;
  }
</style>
