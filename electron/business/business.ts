import type { Item, MainPage, Pagination, Tag } from '@ghs/types';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';

export abstract class BaseBusiness {
  private key: string;
  private $: CheerioAPI;
  protected constructor(key: string) {
    this.key = key;
  }

  private helpElAttr($el: Cheerio<Element>, attr: string): string {
    return $el?.attr(attr) || '';
  }

  private helpElText($el: Cheerio<Element>): string {
    return $el?.text() || '';
  }

  private getCurrentItems(...items: (() => Cheerio<Element>)[]): Cheerio<Element> {
    let res = null;
    items.forEach((func) => {
      if (res === null) {
        const foo = func();
        if (foo.length > 0) {
          res = foo;
        }
      }
    });
    return res || items[0]();
  }

  async getMainPage(html: string): Promise<MainPage> {
    this.$ = cheerio.load(html);
    return {
      items: this.getItems(),
      pagination: this.getPagination(),
      tags: this.getTags(),
    };
  }

  getItems(): Item[] {
    const items: Item[] = [];
    return items;
  }

  getPagination(): Pagination[] {
    return null;
  }

  getTags(): Tag[] {
    return null;
  }
}
