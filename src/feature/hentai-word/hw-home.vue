<template>
  <ViewLayout>
    <template #body>
      <div h-full w-full overflow-auto> {{ a }}</div>
    </template>
  </ViewLayout>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { hw_f_getPageInfo } from '@/feature/hentai-word/apis/HwApis';
  import { f_request_html_get, f_win_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/ViewLayout.vue';

  const a = ref('1');
  const init = async () => {
    const html = await f_request_html_get('https://thehentaiworld.com/?new');
    a.value = await hw_f_getPageInfo(html);
    console.log(a.value);
  };
  onMounted(() => {
    init();
  });
</script>

<style scoped lang="less"></style>
