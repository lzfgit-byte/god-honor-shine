import type { Item, MainPage, Pagination, Tag } from '@ghs/types';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
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
   * @param html
   */
  public async getMainPage(url: string): Promise<MainPage> {
    this.$ = cheerio.load(url);
    return {
      items: this.getItems(),
      pagination: this.getPagination(),
      tags: this.getTags(),
    };
  }

  public getDetailPage(url: string) {}
}
