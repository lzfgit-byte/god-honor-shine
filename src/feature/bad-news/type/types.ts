export type videType = '长视频' | '' | string;
export interface pageType {
  jumpUrl?: string;
  page?: string;
  isCurrent?: boolean;
}
export interface video {
  title?: string;
  coverUrl?: string;
  videType?: videType;
  jumpUrl?: string;
  videoUrl?: string;
  time?: string;
}
export interface pageInfo {
  video?: video[];
  tags?: string[];
  pages?: pageType[]; // 分页
}
