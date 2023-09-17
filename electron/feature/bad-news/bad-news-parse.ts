import * as cheerio from 'cheerio';
type videType = 'long' | 'short';
interface pageType {
  jumpUrl?: string;
  page?: string;
  isCurrent?: boolean;
}
interface mainPageInfo {
  title?: string;
  coverUrl?: string;
  videType?: videType;
  jumpUrl?: string;
  videoUrl?: string;
  time?: string;
  tags?: string[];
  pages?: pageType[];
}
