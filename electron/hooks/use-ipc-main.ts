/**
 *处理从页面传到的方法请求
 */
import { ipcMain } from 'electron';
import * as utils from '../utils';
import * as business from '../business';

const funS = { ...utils, ...business };

export default () => {
  Object.keys(funS).forEach((key) => {
    ipcMain.handle(key, (sender, ...args) => {
      return funS[key](...args);
    });
  });
};
