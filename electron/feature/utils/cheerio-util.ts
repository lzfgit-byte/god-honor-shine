import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';

export const helpElAttr = ($el: Cheerio<Element>, attr: string) => {
  return $el?.attr(attr) || '';
};
export const helpElText = ($el: Cheerio<Element>) => {
  return $el?.text() || '';
};
export const getCurrentItems = (...items: (() => Cheerio<Element>)[]): Cheerio<Element> => {
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
};
