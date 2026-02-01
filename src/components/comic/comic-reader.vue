<template>
  <div ref="containerRef" h-full w-full overflow-auto>
    <ComicImage
      v-for="(item, index) in comicImages"
      :key="item.url"
      :url="item.url"
      :index="index"
      :extra="item.extra"
    ></ComicImage>
    <a-drawer v-model:open="drawValue" width="40vw">
      <template #title>
        <div flex justify-start items-center>
          <span p-r-2>目录</span>
          <a-switch v-model:checked="autoLoadNext"></a-switch>
        </div>
      </template>
      <div
        v-for="(item, index) in contents"
        :key="item.url"
        flex
        justify-start
        items-center
        m-b-2
        :class="{ currentContentInDraw: currentContent?.contentUrl === item.url }"
      >
        <span v-if="currentContent?.contentUrl === item.url">
          {{ `${index + 1}/${contents.length}` }}
        </span>
        <a-button
          :type="currentContent?.contentUrl === item.url ? 'link' : 'text'"
          size="small"
          w-full
          text-start
          @click="getImages(item.url)"
        >
          <GhsText :value="item.title"></GhsText>
        </a-button>
      </div>
    </a-drawer>
    <a-drawer v-model:open="commentDraw" title="评论" width="40vw">
      <GhsComment
        v-for="(item, index) in comicImages[0].extra"
        :key="`ghsc${index}`"
        :comment="item.comment"
        :image="item.image"
        :datetime="item.datetime"
      ></GhsComment>
    </a-drawer>
  </div>
  <a-float-button
    :style="{ right: '15px', bottom: '190px' }"
    :tooltip="comicImages.length > 0 ? comicImages[0]?.extra?.length : '无评论'"
    @click="commentDraw = true"
  >
    <template #icon>
      <CrownOutlined />
    </template>
  </a-float-button>
  <a-float-button :style="{ right: '15px', bottom: '140px' }">
    <template #icon>
      {{ (percent * 100).toFixed(0) }}
    </template>
  </a-float-button>
  <a-float-button :style="{ right: '15px', bottom: '90px' }" @click="drawValue = true">
    <template #icon>
      <ProfileOutlined />
    </template>
  </a-float-button>
  <a-float-button :style="{ right: '15px', bottom: '40px' }" @click="router.back()">
    <template #icon>
      <RollbackOutlined />
    </template>
  </a-float-button>
</template>
<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { CrownOutlined, ProfileOutlined, RollbackOutlined } from '@ant-design/icons-vue';
  import GhsComment from 'test-table/src/components/comment/ghs-comment.vue';
  import useComicState from '@/components/comic/hooks/useComicState';
  import ComicImage from '@/components/comic/comic-image.vue';
  import GhsText from '@/components/text/ghs-text.vue';

  const route = useRoute();
  const router = useRouter();
  const {
    containerRef,
    contents,
    getImages,
    comicImages,
    drawValue,
    currentContent,
    percent,
    autoLoadNext,
    commentDraw,
  } = useComicState(route?.query?.url as string);
</script>

<style scoped lang="less"></style>
