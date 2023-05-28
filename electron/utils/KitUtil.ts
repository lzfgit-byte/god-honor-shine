export const isFalsity = (data) =>
  data === null ||
  data === '' ||
  data === undefined ||
  data === 'undefined' ||
  data === false ||
  data === 'null';

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
