<template>
  <div ref="containerRef" h-full w-full overflow-auto>
    <ComicImage
      v-for="item in comicImages"
      :key="item.url"
      :url="item.url"
      :extra="item.extra"
    ></ComicImage>
    <a-drawer v-model:open="drawValue" title="目录" width="30vw">
      <a-button
        v-for="item in contents"
        :key="item.url"
        :title="item.url"
        @click="getImages(item.url)"
      >
        {{ item.title }}
      </a-button>
    </a-drawer>
  </div>
  <a-float-button @click="router.back()">
    <template #icon>
      <RollbackOutlined />
    </template>
  </a-float-button>
</template>
<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  import { RollbackOutlined } from '@ant-design/icons-vue';
  import useComicState from '@/components/comic/hooks/useComicState';
  import ComicImage from '@/components/comic/comic-image.vue';

  const route = useRoute();
  const router = useRouter();
  const { containerRef, contents, getImages, comicImages, drawValue } = useComicState(
    route?.query?.url as string
  );
  onMounted(() => {
    console.log(route.query);
  });
</script>

<style scoped lang="less"></style>
