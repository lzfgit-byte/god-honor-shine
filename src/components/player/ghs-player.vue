<template>
  <GhsDialog
    v-model:visible="visible"
    :title="titleComp"
    :destroy-on-close="true"
    top="5%"
    :mask-closed="true"
    @close="drawerOpen = false"
  >
    <div id="ghs-video-container-id" min-h-80vh relative>
      <VideoHtml5
        v-if="videoVisible && visible"
        :key="srcComp"
        :src="srcComp"
        :title="titleComp"
        :type="typeComp"
      ></VideoHtml5>
      <GhsPlayerComments :comments="comments"></GhsPlayerComments>
    </div>
    <template v-if="urlsRef?.length > 0" #footer>
      <GhsTag
        v-for="(item, index) in urlsRef"
        :key="item.url + index"
        :show-gap="true"
        :type="srcComp === item.url ? 'info' : 'waring'"
        @click="handleClick(item)"
      >
        {{ item.quality }}
      </GhsTag>
    </template>
  </GhsDialog>
</template>
<script setup lang="ts">
  import { ref } from 'vue-demi';
  import type { Comment, Detail } from '@ghs/types';
  import VideoHtml5 from '@/components/player/video-html5.vue';
  import type { VideoType } from '@/components/player/types';
  import GhsTag from '@/components/tag/ghs-tag.vue';
  import GhsDialog from '@/components/dialog/ghs-dialog.vue';
  import GhsPlayerComments from '@/components/player/ghs-player-comments.vue';
  const visible = ref(false);
  const srcComp = ref<String>();
  const titleComp = ref<String>();
  const typeComp = ref<'m3u8' | 'mp4'>();
  const urlsRef = ref();
  const videoVisible = ref(false);
  const handleClick = (info: Detail) => {
    srcComp.value = info.url;
    videoVisible.value = true;
  };
  const drawerOpen = ref(false);
  const comments = ref<Comment[]>([]);

  defineExpose({
    show: (src: string, title: string, type: VideoType, comments_?: Comment[]) => {
      urlsRef.value = [];
      srcComp.value = src;
      titleComp.value = title;
      typeComp.value = type;
      visible.value = true;
      videoVisible.value = true;
      comments.value = comments_;
    },
    showWithTag: (urls: Detail[], title: string, type: VideoType) => {
      videoVisible.value = false;
      srcComp.value = null;
      urlsRef.value = urls;
      titleComp.value = title;
      typeComp.value = type;
      visible.value = true;
      // 默认播放最高的清晰度
      const c = urls.map((i) => parseInt(i.quality)).reduce((c, n) => (c > n ? c : n), 0);
      srcComp.value = urls.find((i) => parseInt(i.quality) === c)?.url;
      videoVisible.value = true;
    },
  });
</script>

<style scoped lang="less"></style>
