/**
 *处理从页面传到的方法请求
 */
import { ipcMain } from 'electron';
import * as controller from '../controller';

const funS = { ...controller };

export default () => {
  Object.keys(funS).forEach((key) => {
    ipcMain.handle(key, (sender, ...args) => {
      return funS[key](...args);
    });
  });
};
