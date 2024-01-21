import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';

export const helpElAttr = ($el: Cheerio<Element>, attr: string) => {
  return $el.attr(attr) || '';
};
export const helpElText = ($el: Cheerio<Element>) => {
  return $el.text() || '';
};
