export enum ElementAttr {
  src = 'src',
  title = 'title',
  href = 'href',
  class = 'class',
  dataWebp = 'data-webp',
  dataSrc = 'data-src',
  dataOriginal = 'data-original',
  poster = 'poster',
  dataSource = 'data-source',
  dataType = 'data-type',
  dataEcho = 'data-echo',
  dataError = 'data-error',
  alt = 'alt',
}
export enum ElementTypes {
  a = 'a',
  img = 'img',
  h4 = 'h4',
  h1 = 'h1',
  video = 'video',
  source = 'source',
  p = 'p',
}

export interface PaginationType {
  title?: string; // 内容
  url?: string; // 跳转的url
  isCurrent?: boolean; // 是否当前页
}
export interface PageTags {
  title?: string;
  url?: string;
}

export interface PageItemType {
  title?: string; // 标题
  coverImg?: string; // 封面
  jumpUrl?: string; // 下一个页面地址
  author?: string; // 作者
  tags?: PageTags[]; // 标签
  flatTags?: PageTags[]; // 浮动标签
  [T: string]: any;
}
export interface MainPage {
  pagination?: PaginationType[]; // 当前页面的分页
  tags?: PageTags[]; // 页面的普遍tag,处理为首页横幅
  items?: PageItemType[]; // 页面列表
}

export interface ComicContent {}

export interface UrlInfoType {
  url?: string;
  hd?: string;
}
