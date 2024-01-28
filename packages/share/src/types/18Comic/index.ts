export interface Comic18Content {
  title?: string;
  link?: string;
  time?: string;
}
export interface ComicImages {
  url?: string;
}
export interface Comic18Detail {
  detail?: string;
  contents?: Comic18Content[];
}
export interface ComicReader {
  imgUrl?: string;
  aid?: string;
  scrambleId?: string;
}
