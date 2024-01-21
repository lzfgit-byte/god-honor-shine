<template>
  <ViewLayout>
    <template #body>
      <div h-full w-full overflow-auto>
        <div style="width: 200px; height: 100px">
          <GhsImg
            url="https://thehentaiworld.com/wp-content/uploads/2024/01/Night-Elf-NoName55-Warcraft-Animated-hentai-3D-CGI-Video_thumb1-220x147.jpg"
          ></GhsImg>
        </div>
      </div>
    </template>
  </ViewLayout>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { hw_f_getPageInfo } from '@/feature/hentai-word/apis/HwApis';
  import { f_request_html_get, f_win_html_get } from '@/utils/functions';
  import ViewLayout from '@/components/layout/view-layout.vue';
  import GhsImg from '@/components/image/ghs-img.vue';

  const a = ref('1');
  const init = async () => {
    const html = await f_request_html_get('https://thehentaiworld.com/?new');
    a.value = await hw_f_getPageInfo(html);
  };
  onMounted(() => {
    init();
  });
</script>

<style scoped lang="less"></style>
