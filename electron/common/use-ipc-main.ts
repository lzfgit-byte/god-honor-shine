import { ipcMain } from 'electron';
import * as utils from '../utils';

const funcs = { ...utils };

export default () => {
  Object.keys(funcs).forEach((key) => {
    ipcMain.handle(key, (sender, ...args) => {
      return funcs[key](...args);
    });
  });
};
