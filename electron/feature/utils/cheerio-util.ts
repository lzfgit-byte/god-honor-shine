import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';

export const helpElAttr = ($el: Cheerio<Element>, attr: string) => {
  return $el?.attr(attr) || '';
};
export const helpElText = ($el: Cheerio<Element>) => {
  return $el?.text() || '';
};
export const getCurrentItems = (...items: (() => Cheerio<Element>)[]): Cheerio<Element> => {
  let element = items.find((item) => item().length > 0);

  return (element && element()) || items[0]();
};
