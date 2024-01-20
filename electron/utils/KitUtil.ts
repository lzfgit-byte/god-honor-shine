import { join } from 'node:path';
import { Md5 } from 'ts-md5';
export const isFalsity = (data) =>
  data === null ||
  data === '' ||
  data === undefined ||
  data === 'undefined' ||
  data === false ||
  data === 'null' ||
  data === false;

export const isTruth = (data) => !isFalsity(data);
export const formatSize = (size: any, pointLength = 2, units: any = null) => {
  let unit;
  units = units || ['B', 'K', 'M', 'G'];
  unit = units.shift();
  while (unit && size > 1024) {
    size = size / 1024;
    unit = units.shift();
  }
  return (
    (unit === units[0] ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + unit
  );
};
export const resolvePreload = (fileName: string) => join(__dirname, `../preload/${fileName}.js`);
export const resolvePublic = (filePath: string) => join(process.env.PUBLIC, filePath);
export const resolveCachePath = () => '';
export const hashStr = (str: string) => {
  return Md5.hashStr(str);
};
