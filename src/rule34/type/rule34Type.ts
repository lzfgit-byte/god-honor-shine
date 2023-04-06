export interface coverImgInfo {
  src?: string;
}
export interface videoInfo extends coverImgInfo {
  title?: string;
  jumpUrl?: string;
  time?: string;
  quality?: string;
  views?: string;
  added?: string;
}
export interface pageInfo {
  current?: boolean;
  text?: string;
  jumpUrl?: string;
  fromAlbums?: string;
}
export interface mainPage {
  videos?: videoInfo[];
  pages?: pageInfo[];
}
export interface videoData {
  postFix?: string;
  videoUrl?: string;
}
