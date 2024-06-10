import { ref } from 'vue';
import type { Detail } from '@ghs/types';
export interface ImgViewerExpose {
  show: (imgs: Detail[]) => void;
  close: () => void;
}
export const imgViewerRef = ref<ImgViewerExpose>();
export default () => {
  return { imgViewerRef };
};
