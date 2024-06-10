import { ref } from 'vue';
import type { Detail } from '@ghs/types';
import type { VideoType } from '@/components/player/types';
export interface ImgViewerExpose {
  show: (imgs: Detail[]) => void;
  close: () => void;
}
export interface GhsPlayerExpose {
  show: (src: string, title: string, type: VideoType) => void;
  showWithTag: (urls: Detail[], title: string, type: VideoType) => void;
}
export const imgViewerRef = ref<ImgViewerExpose>();
export const videoGlobalRef = ref<GhsPlayerExpose>();
export default () => {
  return { imgViewerRef, videoGlobalRef };
};
