<template>
  <div flex-inline class="ghs-s-con" items-center relative>
    <input
      v-model="value"
      class="ghs-search"
      h-full
      placeholder="请输入"
      h-4
      @keydown.enter="handleEnterClick"
      @focus="showHistory = true"
      @blur="showHistory = false"
    />
    <transition duration="200">
      <div v-if="showHistory" class="historySearch" w-full absolute z-2>
        <div
          v-for="item in historyData"
          :key="item"
          h-full
          p-2
          m-1
          class="search-history"
          @click="emits('search', item)"
        >
          {{ item }}
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  defineProps({ historyData: Array });
  const emits = defineEmits(['search']);
  const value = ref('');
  const showHistory = ref(false);
  const handleEnterClick = () => {
    emits('search', value.value);
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
    max-height: 30vh;
    background-color: white;
    border-radius: @radius;
    bottom: 0;
    transform: translateY(102%);
    transition: transform 0.3s linear, opacity 0.3s linear;
    .search-history {
      cursor: pointer;
      border-radius: inherit;
      &:hover {
        background-color: #e2e3e5;
      }
    }
  }

  .v-leave-from,
  .v-enter-to {
    transform: translateY(102%);
    opacity: 1;
  }
  .v-enter-from,
  .v-leave-to {
    transform: translateY(90%);
    opacity: 0;
  }
</style>
