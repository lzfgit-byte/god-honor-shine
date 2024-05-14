import type { UrlInfoType } from '@ghs/share/src';

export type VideoType = 'm3u8' | 'mp4';
export interface GhsPlayerExpose {
  show: (src: string, title: string, type: VideoType) => void;
  showWithTag: (urls: UrlInfoType[], title: string, type: VideoType) => void;
}
