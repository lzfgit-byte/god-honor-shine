interface coverImgInfo {
  src?: string;
}
interface videoInfo extends coverImgInfo {
  title?: string;
  jumpUrl?: string;
  time?: string;
  quality?: string;
}
interface pageInfo {
  current?: boolean;
  text?: string;
  jumpUrl?: string;
}
export interface mainPage {
  videos?: videoInfo[];
  pages?: pageInfo[];
}
