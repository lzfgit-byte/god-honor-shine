import { allFunc } from '../../electron/utils/ipc';
import { ipcRenderer } from 'electron';

const isBlank = (str: string) => {
  return str === undefined || (str.trim && str.trim() === '');
};
export const exportFunc: any = (() => {
  const exportFunc: any = {};
  Object.keys(allFunc).forEach((funcName) => {
    exportFunc[funcName] = async (...args: any) => {
      if (args.length > 0 && isBlank(args[0])) return;
      return ipcRenderer.invoke(funcName, ...args);
    };
  });
  return exportFunc;
})();
