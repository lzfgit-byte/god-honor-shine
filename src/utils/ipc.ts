import { ipcRenderer } from 'electron';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../../config.json';
const isBlank = (str: string) => {
  return str === undefined || (str.trim && str.trim() === '');
};
export const exportFunc: any = (() => {
  const exportFunc: any = {};
  config.methods.forEach((funcName: string) => {
    exportFunc[funcName] = async (...args: any) => {
      if (args.length > 0 && isBlank(args[0])) return;
      return ipcRenderer.invoke(funcName, ...args);
    };
  });
  return exportFunc;
})();
