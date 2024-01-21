export interface PaginationType {
  title?: string;
  url?: string;
  label?: string;
}
export interface PageTags {
  title?: string;
  url?: string;
}
export interface MainPageInfoType {
  title?: string; // 标题
  coverImg?: string; // 封面
  author?: string; // 作者
  type?: string; // 类型
  tags?: PageTags[]; // 标签
  flatTags?: PageTags[]; // 浮动标签
  pages?: PaginationType[]; // 分页
  [T: string]: any;
}

export interface ComicContent {}
