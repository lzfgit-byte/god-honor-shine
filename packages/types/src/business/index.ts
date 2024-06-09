export interface Pagination {
  url: string;
  title: string;
  isCurrent: boolean;
}
export interface Tag {
  title?: string;
  url?: string;
}
export enum ItemType {
  video = 'video',
  image = 'image',
  text = 'text',
  comic = 'comic',
}
// 将上边枚举转换为联合类型
export type ItemTypeUnion = keyof typeof ItemType;
export enum ItemDetailType {
  mp4 = 'mp4',
  m3u8 = 'm3u8',
  image = 'image',
}
// 将上边枚举转换为联合类型
export type ItemDetailTypeUnion = keyof typeof ItemDetailType;
export enum RenderType {
  force = 'force',
  normal = 'normal',
}
// 将上边枚举转换为联合类型
export type RenderTypeUnion = keyof typeof RenderType;
export interface Detail {
  type: ItemTypeUnion;
  url: string;
  quality?: string;
  comments: Comment[];
}
export interface Item {
  coverImg: string;
  title: string;
  type: ItemTypeUnion;
  jumpUrl: string;
  renderType: RenderTypeUnion; // 渲染类型,强制渲染,正常渲染
  tags: Tag[];
}
export interface UrlAppend {
  value: string;
  param: string;
  title: string; // 展示的名字
}
export interface UrlReplace {
  schema: string; // 分组
  urlAppend: UrlAppend[];
}
export interface Comment {
  datetime: string;
  comment: string;
}
/**
 *点击Item,后获取详细信息
 */
export interface DetailInfo {
  detailType: ItemDetailTypeUnion;
  renderType: RenderTypeUnion; // 渲染类型,强制渲染,正常渲染
  details: Detail[];
  relations: Item[];
}

/**
 * 每一页的类型
 */
export interface MainPage {
  pagination: Pagination[]; // 分页
  tags: Tag[];
  items: Item[];
  urlReplace?: UrlReplace[];
}

export * from './web-config';
