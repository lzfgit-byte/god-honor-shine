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
  author?: string; // 作者
  type?: string; // 类型
  tags?: PageTags[]; // 标签
  flatTags?: PageTags[]; // 浮动标签
  [T: string]: any;
}
export interface MainPage {
  pagination?: PaginationType[]; // 当前页面的分页
  tags?: PageTags[]; // 页面的普遍tag
  items?: PageItemType[]; // 页面列表
}

export interface ComicContent {}
