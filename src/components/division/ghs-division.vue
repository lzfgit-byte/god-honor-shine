<template>
  <div flex-inline box-border class="ghs-division" relative>
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="less">
  .ghs-division {
    padding-left: 8px;
    border-left: 1px #e3dcdc solid;
  }
</style>
