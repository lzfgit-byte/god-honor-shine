import type { Item, MainPage, Pagination, Tag } from '@ghs/types';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import type { DetailInfo } from '@ghs/types/src';
import { getHtml } from '../export';
import { AdapterFunc } from './adapter-func';

export abstract class BaseBusiness extends AdapterFunc {
  private key: string;
  $: CheerioAPI;
  protected constructor(key: string) {
    super();
    this.key = key;
  }

  // 获取页面的元素数据
  private getItems(): Item[] {
    return this.getMainPageRes(this.getCurrentItems, this.getItemByEl);
  }

  // 获取页面的分页数据;
  private getPagination(): Pagination[] {
    return this.getMainPageRes(this.getCurrentPagination, this.getPaginationByEl);
  }

  // 获取首页的标签数据
  private getTags(): Tag[] {
    return this.getMainPageRes(this.getCurrentTags, this.getTagByEl);
  }

  /**
   * 获取页面数据，包含首页，搜索页
   */
  public async getMainPage(url: string): Promise<MainPage> {
    const html = await getHtml(url);
    this.$ = cheerio.load(html);
    return {
      items: this.getItems(),
      pagination: this.getPagination(),
      tags: this.getTags(),
      urlReplace: this.getUrlReplace(),
    };
  }

  /**
   *item 点击后，获取详细信息
   */
  public async getDetailPage(item: Item): Promise<DetailInfo> {
    return this.getDetailInfo(item);
  }
}
