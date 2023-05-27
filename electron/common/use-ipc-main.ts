import { ipcMain } from 'electron';
import * as utils from '../utils';
import * as feature from '../feature';

const funcs = { ...utils, ...feature };

export default () => {
  Object.keys(funcs).forEach((key) => {
    ipcMain.handle(key, (sender, ...args) => {
      return funcs[key](...args);
    });
  });
};
