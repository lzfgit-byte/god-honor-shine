import type { HWImgInfo } from '@ghs/share';

export interface ImgViewerExpose {
  show: (imgs: HWImgInfo[]) => void;
  close: () => void;
}
