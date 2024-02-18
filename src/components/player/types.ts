export type VideoType = 'm3u8' | 'mp4';
export interface GhsPlayerExpose {
  show: (src: string, title: string, type: VideoType) => void;
}
