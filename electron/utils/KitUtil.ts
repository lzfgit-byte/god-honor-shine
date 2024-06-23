import { join } from 'node:path';
import { EventEmitter } from 'node:events';
import dayjs from 'dayjs';
import type { Cheerio } from 'cheerio/lib/cheerio';
import type { Element } from 'domhandler';
import { app } from 'electron';

export const getCurrentDate = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
export const execPercentage = (cur: number, total: number): number => {
  return Math.min(+((cur / total) * 100).toFixed(0), 100);
};
export const resolvePreload = (fileName: string) => join(__dirname, `../preload/${fileName}.js`);
export const resolvePublic = (filePath: string) => join(process.env.PUBLIC, filePath);
export const eventEmitter = new EventEmitter();

export const helpElAttr = ($el: Cheerio<Element>, attr: string): string => {
  return $el?.attr(attr) || '';
};
export const helpElText = ($el: Cheerio<Element>): string => {
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
export const restartApp = () => {
  app.relaunch();
  app.quit();
};
