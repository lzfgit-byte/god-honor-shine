export interface PaginationType {
  url: string;
}
export interface TagType {
  pages: PaginationType[];
}
export interface WebAppType {
  baseUrl: string;
  name: string;
  icon: string;
  tags: TagType[];
}
